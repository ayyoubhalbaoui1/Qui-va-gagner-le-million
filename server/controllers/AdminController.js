const mongoose = require('mongoose')
const Admin = require('../models/Admin')
const Participant = require('../models/Participant')
const Qusetion = require('../models/Qustion')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { sendMali } = require('./MethodeController')
const nexmo = require('../config/sms')
const PartContrller = require('./ParticipantController')
require('dotenv').config({ path: __dirname + '/../.env' })

//PartContrller.hola();
class AdminController {
    async loginAdmin(req, res) {
        const body = req.body
        const admin = await Admin.findOne({ phone: body.phone })
        if (admin) {
            bcrypt.compare(body.password, admin.password, (err, result) => {
                if (result) {
                    var token = null
                    if (admin.is_super_admin) {
                        token = jwt.sign({ _id: admin._id, is_super_admin: admin.is_super_admin }, process.env.TOKENKEY, { expiresIn: 60 * 60 })
                        console.log('super admin');
                    } else {
                        token = jwt.sign({ _id: admin._id, is_admin: admin.is_admin }, process.env.TOKENKEY, { expiresIn: 60 * 60 })
                        console.log('admin');
                    }
                    res.send({ admin: admin, token: token })
                } else {
                    res.send('not admin')
                }
            })
        } else {
            res.send('go to signup page')
        }

    }

    async addAdmin(req, res) {
        bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
            if (err) {
                console.log(err);
            } else {
                const admin = new Admin({
                    phone: req.body.phone,
                    password: hash
                })
                admin.save()
                    .then(doc => {
                        res.status(200).send(doc)
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        })
    }

    async particapantvalidate(req, res) {
        const validate = await Participant.findByIdAndUpdate({ _id: req.params.id }, { $set: { is_valid: true } }, { new: true })
        const email = await sendMali(validate)

        // const from = 'million';
        // const to = validate.phone
        // const text = `congratulation dear ${validate.full_name} your account is verified you can play anytime and make money `;
        // const sms = await nexmo.message.sendSms(from, to, text)
        res.status(202).send(validate)
    }


    async addQustion(req, res) {
        const question = new Qusetion({
            quest: req.body.quest,
            answer: req.body.answer,
            false_choise: req.body.false_choise,
            points: req.body.points

        })
        const saveQu = await question.save()
        res.status(200).send(saveQu)
    }
}

module.exports = new AdminController()