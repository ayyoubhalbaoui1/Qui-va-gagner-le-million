const express = require('express')
const router = express.Router()
const Participant = require('../models/Participant')
const ParticipantController = require('../controllers/ParticipantController')
const tokenMiddleware = require('../middleware/auth')

router.post('/signup',ParticipantController.addParticipant)
router.post('/login',ParticipantController.loginParticipant)
router.post('/creatGroup',tokenMiddleware,ParticipantController.creatGroup)
router.patch('/joinGroup',tokenMiddleware,ParticipantController.grouJoin)
router.post('/addAnwser/:id',ParticipantController.anwser)
router.get('/getQuestion/:code',ParticipantController.getRandomQuestion)

module.exports = router