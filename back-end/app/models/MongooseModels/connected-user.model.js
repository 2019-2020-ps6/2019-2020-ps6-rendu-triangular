const mongoose = require('mongoose')

const ConnectedUser = mongoose.Schema({
    username: String,
    signInDate: String,
    signOutDate: String
})

module.exports = mongoose.model('ConnectedUser', ConnectedUser, 'ConnectedUser')
