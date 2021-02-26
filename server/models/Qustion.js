const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    quest :{
        type : String,
        require :true
    },
    answer :{
        type : String,
        require :true
    },
    false_choise :{
        type : [String],
        require :true
    },
    points :{
        type : Number,
        require :true
    }
}) 

const Qustion = mongoose.model('Qusetion',questionSchema)
module.exports = Qustion