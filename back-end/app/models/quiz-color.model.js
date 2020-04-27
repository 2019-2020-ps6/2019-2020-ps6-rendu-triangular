const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('quiz-color', {
    name: Joi.string(),
    color: Joi.string().required(),
    value: Joi.number().required()
})
