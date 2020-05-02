const mongoose = require('mongoose')

const GameRecord = mongoose.Schema({
    id: Number,
    startDate: String,
    endDate: String,
    numberOfAttempts: Number,
    finalScore: Number,
    duration: Number,
    typeOfQuiz: String
})

module.exports = mongoose.model('GameRecord', GameRecord, 'GameRecord')
