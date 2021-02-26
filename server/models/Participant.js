const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config({path:__dirname+'/../.env'})

const participantSchema = new mongoose.Schema({
    full_name :{
        type : String,
        require : true
    },
    age:{
        type : Number,
        require : true 
    },
    phone :{
        type : String,
        require : true
    },
    is_valid :{
        type : Boolean,
        default : false
    },
    password :{
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    points : Number
})

participantSchema.methods.generateToken = function(){
    const token = jwt.sign({_id : this._id,is_valid : this.is_valid},process.env.TOKENKEY,{expiresIn : 60*60})
    return token
}

const Participant = mongoose.model('Participant', participantSchema)
module.exports = Participant