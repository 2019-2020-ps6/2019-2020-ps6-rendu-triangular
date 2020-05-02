const mongoose = require('mongoose')

const QuizColor = mongoose.Schema({
    name: String,
    color: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('QuizColor', QuizColor, 'QuizColor')
