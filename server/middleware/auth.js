const jwt = require('jsonwebtoken')
require('dotenv').config({path : __dirname+'./../.env'})

function verifyLogin(req,res,next) {
    const token = req.header('x-auth-token')
    if(!token){
       return res.send('redirect to login page')
    }
    try {
        const tokenDecode = jwt.verify(token,process.env.TOKENKEY)
        req.admin = tokenDecode
        next()
    } catch (error) {
        return res.status(401).send('token error')
    }
}

module.exports = verifyLogin

