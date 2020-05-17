const mongoose = require('mongoose')

const ConnectedUser = mongoose.Schema({
    username: String,
    signInDate: {
        type: Date
    },
    signOutDate: {
        type: Date,
        default: Date.now()
    },
    type: String
})

module.exports = mongoose.model('ConnectedUser', ConnectedUser, 'ConnectedUser')
