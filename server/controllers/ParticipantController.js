const mongoose = require('mongoose')
require('express-async-errors');
const Participant = require('../models/Participant')
const Group = require('../models/Group')
const Qustion = require('../models/Qustion')
const QuestionToken = require('../models/QuestionToken')
const Round = require('../models/Round')
const bcrypt = require('bcrypt')
const { getNumber, saveLog } = require('../controllers/MethodeController')
const jwt = require('jsonwebtoken');
const { findOne } = require('../models/Participant');
require('dotenv').config({ path: __dirname + '/../.env' })


class ParticipantController {


    addParticipant = async (req, res) => {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                console.log(err);
            } else {
                const participant = new Participant({
                    full_name: req.body.full_name,
                    age: req.body.age,
                    phone: req.body.phone,
                    email: req.body.email,
                    password: hash
                })
                participant.save()
                    .then(doc => {
                        res.status(200).send(doc)
                    })
                    .catch(err => {
                        res.status(400).console.log(err);
                    })
            }
        })

    }

    async loginParticipant(req, res) {
        const participant = await Participant.findOne({ email: req.body.email })
        if (participant) {
            bcrypt.compare(req.body.password, participant.password, (err, result) => {
                if (result) {
                    const token = participant.generateToken()
                    res.send({ user: participant, token: token })
                } else {
                    res.send('email or password incorrect')
                }
            })
        } else {
            res.send('go to signup page')
        }
    }

    async creatGroup(req, res) {
        const token = req.header('x-auth-token')
        const tokenDecode = jwt.verify(token, process.env.TOKENKEY)
        if (tokenDecode.is_valid) {
            await Participant.findByIdAndUpdate({ _id: tokenDecode._id }, { $set: { points: 0 } })
            const userPlay = await Group.findOne({ start: true, id_participants: tokenDecode._id })
            console.log(userPlay);
            if (userPlay) {
                const deleteUser = await userPlay.id_participants.pull(tokenDecode._id)
                const Updated = await userPlay.save()
                const group = new Group({
                    id_participants: tokenDecode._id,
                    code: await getNumber()
                })
                // console.log(group);
                const newGroup = await group.save()
                res.status(200).json({ message: 'tzad fa jdid', group: newGroup })
            } else {

                const group = new Group({
                    id_participants: tokenDecode._id,
                    code: await getNumber()
                })
                // console.log(group);
                const newGroup = await group.save()
                res.status(202).json({ message: 'marhaba', group: newGroup })
            }
            saveLog("create group", "info", "creatGroup")
        } else {
            res.send('not valid')

        }
    }

    async grouJoin(req, res) {
        const token = req.header('x-auth-token')
        const tokenDecode = jwt.verify(token, process.env.TOKENKEY)
        if (tokenDecode.is_valid) {

            const code = req.body.code
            const group = await Group.findOne({ code: code })
            if (group) {
                await Participant.findByIdAndUpdate({ _id: tokenDecode._id }, { $set: { points: 0 } })
                if (group.id_participants.length < 4) {
                    if (group.id_participants.includes(tokenDecode._id)) {
                        res.send('you are already joined')
                    } else {
                        const userPlay = await Group.findOne({ start: true, id_participants: tokenDecode._id })
                        console.log(userPlay);
                        if (userPlay) {
                            const deleteUser = await userPlay.id_participants.pull(tokenDecode._id)
                            const Updated = await userPlay.save()
                            const groupAfterJoin = await group.id_participants.push(tokenDecode._id)
                            const groupUpdated = await group.save()
                            res.status(200).json({ message: 'delete from the first group and reset point to 0', group: groupUpdated })
                        } else {
                            const groupAfterJoin = await group.id_participants.push(tokenDecode._id)
                            const groupUpdated = await group.save()
                            res.status(202).json({ message: 'add new participant in team', group: groupUpdated })
                        }
                    }

                } else {
                    res.send('can\'t play more than 4 players')
                }

            } else {
                res.status(404).send('code incorrct')
            }

        } else {
            res.status(422).send('your account is not validate')
        }

    }


    async anwser(req, res) {
        const token = req.header('x-auth-token')
        const tokenDecode = jwt.verify(token, process.env.TOKENKEY)
        if (tokenDecode.is_valid) {
            const group = req.body.group
            const questionId = req.params.id
            const groupMember = await Group.findOne({ code: group })
            if (groupMember.start === true) {
                const findQuestion = await Qustion.findById({ _id: req.params.id })

                const allQustions = await Group.aggregate([
                    { $match: { "code": group } },
                    {
                        $project: {
                            "questions": "$questions",
                            "hasQuestion": {
                                $in: [questionId, "$questions"]
                            }
                        }
                    }
                ])
                if (allQustions[0].hasQuestion) {
                    res.send('this question is already answered')
                } else {

                    const pushQ = await groupMember.questions.push(questionId)
                    const saveQ = await groupMember.save()
                    const questionToken = new QuestionToken({

                        id_question: questionId,
                        participant_anwser: req.body.anwser,
                        id_participant: tokenDecode._id

                    })
                    const saveQT = await questionToken.save()
                    const round = new Round({
                        id_group: groupMember._id,
                        id_question: questionId,
                        id_question_token: saveQT._id
                    })
                    const saveRound = await round.save()
                    // console.log(findQuestion);
                    if (findQuestion.answer == req.body.anwser) {
                        console.log('correct');
                        const addPoint = await Participant.updateOne({ _id: tokenDecode._id }, { $inc: { points: findQuestion.points } })
                    }
                    //  else {
                    //     console.log('incorrect');
                    // }
                    if (groupMember.questions.length === 2) {
                        await groupMember.updateOne({ start: false })
                        // find participant in group 
                        const part0 = await Participant.findById({ _id: groupMember.id_participants[0] }).select('points')
                        const part1 = await Participant.findOne({ _id: groupMember.id_participants[1] }).select('points')
                        const part2 = await Participant.findById({ _id: groupMember.id_participants[2] }).select('points')
                        const part3 = await Participant.findById({ _id: groupMember.id_participants[3] }).select('points')

                        // store point in array 
                        const points = [];
                        points.push(part0.points)
                        points.push(part1.points)
                        points.push(part2.points)
                        points.push(part3.points)

                        const bigger = points.indexOf(Math.max.apply(Math, points))
                        const winner = await Participant.findById({ _id: groupMember.id_participants[bigger] })
                        res.status(202).json({ message: 'the winner is : ', winner: winner });

                    } else {
                        res.status(200).send('save anwser')
                    }
                }


            } else {
                res.status(404).send('game over')
            }


        } else {
            res.status(401).send('your account is not validat')
        }
    }


    async getRandomQuestion(req, res) {

        const docs = await Qustion.countDocuments()
        var random = Math.floor(Math.random() * docs)
        const code = req.params.code
        const randomQuestion = await Qustion.findOne().skip(random)
        const QustionInGroup = await Group.findOne({ code: req.params.code }).select('questions')

        if (QustionInGroup.questions.includes(randomQuestion._id)) {
            await new ParticipantController().getRandomQuestion(req, res);
        } else {
            res.status(200).send(randomQuestion)
        }

    }

}


module.exports = new ParticipantController()