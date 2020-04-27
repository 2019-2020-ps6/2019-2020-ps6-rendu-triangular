const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Connected-user', {
    username: Joi.string(),
    signInDate: new Date(),
    signOutDate: Date.now()
})

