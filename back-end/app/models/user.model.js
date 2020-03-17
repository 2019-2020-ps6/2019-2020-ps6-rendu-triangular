const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('User', {
  lastName: Joi.string().required(),
  firstName: Joi.string().required(),
  age: Joi.number(),
})
