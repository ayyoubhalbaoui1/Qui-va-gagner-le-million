const mongoose = require('mongoose')
const Participant = require('./Participant')
const Qustion = require('./Qustion')

const groupSchema = new mongoose.Schema({
    id_participants:{
        type : [mongoose.Schema.Types.ObjectId],
        ref : Participant
    },
    code : Number,
    questions : {
        type : [String],
        ref : Qustion,
        default : []
    },
    start : {
        type : Boolean,
        default : true
    }
})

const Group = mongoose.model('Group' , groupSchema)

module.exports = Group