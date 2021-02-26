const mongoose = require('mongoose');
const Group = require('./Group');
const Qustion = require('./Qustion');
const QusetionToken = require('./QuestionToken');

const roundSchma = new mongoose.Schema({
    id_group:{
        type : mongoose.Schema.Types.ObjectId,
        ref:Group
    },
    id_question:{
        type: mongoose.Schema.Types.ObjectId,
        ref:Qustion
    },
    id_question_token:{
        type: mongoose.Schema.Types.ObjectId,
        ref:QusetionToken
    },
})

const Round = mongoose.model('Round' , roundSchma)

module.exports = Round