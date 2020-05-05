const mongoose = require('mongoose')

const GameRecord = mongoose.Schema({
    id: Number,
    startDate: {
        type : Date
    },
    endDate: {
        type : Date
    },
    numberOfAttempts: Number,
    finalScore: Number,
    duration: Number,
    typeOfQuiz: String
})

module.exports = mongoose.model('GameRecord', GameRecord, 'GameRecord')
