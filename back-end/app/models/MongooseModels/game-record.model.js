const mongoose = require('mongoose')

const GameRecord = mongoose.Schema({
    id: Number,
    startDate: new Date(),
    endDate: new Date(),
    numberOfAttempts: Number,
    finalScore: Number,
    duration: Number,
    typeOfQuiz: String
})

module.exports = mongoose.model('GameRecord', GameRecord, 'GameRecord')
