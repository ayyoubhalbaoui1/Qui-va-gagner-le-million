const Question = require("../models/question.js")
const Round = require("../models/round")

exports.questionAdd = async (req,res) =>{

    const question = new Question({
        quest : req.body.quest ,
        answer : req.body.answer,
        false_choices : req.body.false_choices,
        points : req.body.points
    })

    try {
        
        const savedQuestion = await question.save()
        res.send(savedQuestion)
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.getAllQuestions = async (req,res) => {
    try {
        questions = await Question.find()
        res.json(questions)
    } catch (error) {
        res.status(500).send({message : error.message})
    }
}

exports.getRandomQuestion = async (req,res) => {
    try {
        Question.countDocuments((err,count) =>{
            var random = Math.floor(Math.random() * count)

            Question.findOne().skip(random).exec(async (err,result) =>{
               const checkQuest =  await Round.findOne({id_question : result._id, is_answered : true})
                
               if (checkQuest) {

                res.send("Question has been already answered. pick up another one !")
                   
               } else {
                res.json([result,{message : "/questionToken/add to submit your answer"}])
               }

               
            })
        })
    } catch (error) {
        res.status(500).send({message : error.message})
    }
}

exports.getQuestions = async (req,res) => {
    try {
        questions = await Question.find().limit(15)
        res.json(questions)
    } catch (error) {
        res.status(500).send({message : error.message})
    }
}