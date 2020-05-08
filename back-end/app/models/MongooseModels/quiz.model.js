const mongoose = require('mongoose')

const Quiz = mongoose.Schema({
    theme: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: String,
    questionIndex: {
        type: Number,
        required: true
    },
    assigneeList: []
})

module.exports = mongoose.model('Quiz', Quiz, 'Quiz')
