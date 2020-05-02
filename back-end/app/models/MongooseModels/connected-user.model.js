const mongoose = require('mongoose')

const ConnectedUser = mongoose.Schema({
    username: String,
    signInDate: new Date(),
    signOutDate: Date.now()
})

module.exports = mongoose.model('ConnectedUser', ConnectedUser, 'ConnectedUser')
