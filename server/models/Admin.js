const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config({path:__dirname+'/../.env'})
const adminSchema = mongoose.Schema({
    phone : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    is_admin : {
        type :Boolean,
        default: true
    },
    is_super_admin : {
        type :Boolean,
        default: false
    }
})
adminSchema.methods.generateToken=async function(){
    const token = await jwt.sign({_id:this._id,is_admin:this.is_admin},process.env.TOKENKEY)
    return token
}

const Admin = mongoose.model('Admin' , adminSchema)
module.exports = Admin