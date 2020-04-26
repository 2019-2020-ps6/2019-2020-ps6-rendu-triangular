const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz-color', {
    name: Joi.string(),
    color: Joi.string(),
    value: Joi.number()
})
