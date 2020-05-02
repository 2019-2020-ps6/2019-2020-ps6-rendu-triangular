const mongoose = require('mongoose')

const User = mongoose.Schema({
    firstName: String,
    lastName: String,
    type: String,
    password: String,
    age: Number
})

module.exports = mongoose.model('User', User, 'User')
