const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')
const NewJoi = require('@hapi/joi')

module.exports = new BaseModel('Quiz', {
  theme: Joi.string().required(),
  name: Joi.string().required(),
})
