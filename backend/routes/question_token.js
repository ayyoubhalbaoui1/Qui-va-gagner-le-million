const router = require('express').Router()
const {addQuestionToken} = require('../controllers/questionTokenController')
const {verifyParticipToken} = require('../controllers/tokenVerification/verifyToken')

router.route('/add').post(verifyParticipToken,addQuestionToken)


module.exports = router