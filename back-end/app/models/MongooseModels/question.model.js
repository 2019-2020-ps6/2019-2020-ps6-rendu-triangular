const mongoose = require('mongoose')

const Question = mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    quizId: Number,
    image: String,
    answers: Array
})

module.exports = mongoose.model('Question', Question, 'Question')
