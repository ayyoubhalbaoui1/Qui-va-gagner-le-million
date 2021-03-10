const router = require('express').Router()
const {questionAdd,getAllQuestions, getRandomQuestion,getQuestions} = require('../controllers/questionController')
const {verifyAdminToken,verifyParticipToken} = require('../controllers/tokenVerification/verifyToken')
const {getRoundsCount} = require('../controllers/roundController')

router.route('/add').post(verifyAdminToken,questionAdd)
router.route('/getAll').get(verifyAdminToken,getAllQuestions)
router.route('/randomQuestion').get(verifyParticipToken,getRandomQuestion)
router.route('/getQuestions').get(getQuestions)
router.route('/test').get(getRoundsCount)

module.exports = router