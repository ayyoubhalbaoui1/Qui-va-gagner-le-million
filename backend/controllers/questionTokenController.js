const QuestionToken = require("../models/question_token")
const Round = require('../models/round')
const Group = require('../models/group_members')
const Question = require('../models/question')
const Participant = require('../models/participant')
const { getRoundsCount } = require("./roundController")
const jwt = require('jsonwebtoken')


exports.addQuestionToken = async (req,res) => {
    const token = req.header('auth-token');
    var id_participant =  jwt.verify(token, process.env.PARTICIPANT_TOKEN_SECRET)._id
    var id_question = req.body.id_question
    var participant_answer = req.body.participant_answer
    var grp_code = req.body.group_code

    const questionExist = await Round.findOne({id_question : id_question, is_answered : true})
    if (questionExist) return res.status(400).send("Too late")

    const group_members = await Group.findOne({group_code : grp_code})
    
    const question = await Question.findById(id_question)
    const participant = await Participant.findById(id_participant)
    const roundsCount = await getRoundsCount(grp_code)

    if (roundsCount == 14) {
        await Round.updateMany(
            { $set: { is_answered: false } }
          );
        res.send("Game over")

    } else {

    if (question.answer == participant_answer) {
        participant.score = participant.score + question.points
        await participant.save()
    }

    const questionToken = new QuestionToken({
        id_question : id_question,
        id_participant : id_participant,
        participant_answer : participant_answer
    })

    try {
        const savedQuestionToken = await questionToken.save()
        const round = new Round({
            id_group_members : group_members._id,
            id_question : id_question,
            id_question_token : savedQuestionToken._id,
            is_answered : true
        })
        try {
            const savedRound = await round.save()
             res.status(200).json([savedRound,savedQuestionToken])
        } catch (error) {
            res.status(500).send({message : error.message})
        }
    } catch (error) {
        res.status(500).send({message : error.message})
    }
    }
    
}