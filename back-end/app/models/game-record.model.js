const Joi = require('joi')
const BaseModel = require('../utils/base-model')

module.exports = new BaseModel('game-record', {
    id: Joi.number(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    numberOfAttempts: Joi.number(),
    finalScore: Joi.number(),
    duration: Joi.number()
})
