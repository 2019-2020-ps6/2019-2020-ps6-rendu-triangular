const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('User', {
    firstName: Joi.string().allow(),
    lastName: Joi.string(),
    type: Joi.string(),
    password: Joi.string(),
    age: Joi.number()
})

