const mongoose = require('mongoose')

const Patient = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('Patient', Patient, 'Patient');
