const mongoose = require('mongoose')

const Answer = mongoose.Schema({
    type: String,
    value: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        required: true
    },
    questionId: Number
})

module.exports = mongoose.model('Answer', Answer, 'Answer')
