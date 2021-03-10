const router = require('express').Router()

const { participRegister, participLogin, participValidation , getAllParticipants} = require('../controllers/participantController')
const {verifyParticipToken, verifyAdminToken} = require('../controllers/tokenVerification/verifyToken')

router.route("/getAll").get(verifyAdminToken,getAllParticipants)
router.route("/register").post(participRegister)
router.route("/login").post(participLogin)
router.route("/validateParticipant/:id").patch(verifyAdminToken,participValidation)
module.exports = router