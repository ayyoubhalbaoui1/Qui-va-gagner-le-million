const router = require('express').Router()

const { getAllAdmins, addAdmin, getOneAdmin, loginAdmin } = require('../controllers/adminController')
const {verifyParticipToken, verifyAdminToken} = require('../controllers/tokenVerification/verifyToken')


router.route("/getAll").get(verifyAdminToken,getAllAdmins)
router.route("/add").post(verifyAdminToken,addAdmin)
router.route("/getOne/:id").get(verifyAdminToken,getOneAdmin)
router.route("/login").post(loginAdmin)

module.exports = router