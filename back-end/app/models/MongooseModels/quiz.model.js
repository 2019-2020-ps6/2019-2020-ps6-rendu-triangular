const mongoose = require('mongoose')
const question = require('../MongooseModels/question.model')

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
    questions: {
        type: Array
    },
    assigneeList: []
})

module.exports = mongoose.model('Quiz', Quiz, 'Quiz')
