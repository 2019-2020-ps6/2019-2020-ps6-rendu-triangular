const mongoose = require('mongoose')

const Question = mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    quizId: mongoose.Types.ObjectId,
    image: String,
    answers: Array
})

module.exports = mongoose.model('Question', Question, 'Question')
