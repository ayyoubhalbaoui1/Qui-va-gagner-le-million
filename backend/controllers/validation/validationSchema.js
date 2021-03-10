const Joi = require('joi')

exports.participantRegisterSchema = Joi.object({
    full_name: Joi.string().min(6).required(),
    age: Joi.required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(10).required(),
    password : Joi.string().min(6).required()

})

exports.participantLoginSchema = Joi.object({
    phone: Joi.string().min(10).max(10).required(),
    password : Joi.string().min(6).required()

})

exports.adminRegisterSchema = Joi.object({
    full_name: Joi.string().min(4).required(),
    phone: Joi.string().min(10).max(10).required(),
    password: Joi.string().min(4).required(),
  });

exports.adminLoginSchema = Joi.object({
    phone: Joi.string().min(10).max(10).required(),
    password: Joi.string().min(4).required(),
  });