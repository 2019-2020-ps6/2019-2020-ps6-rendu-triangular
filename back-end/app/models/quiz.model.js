const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')
const Question = require('../models/question.model')

module.exports = new BaseModel('Quiz', {
  theme: Joi.string().required(),
  name: Joi.string().required(),
})
