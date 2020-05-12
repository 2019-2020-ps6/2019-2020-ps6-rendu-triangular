const mongoose = require('mongoose')

const ConnectedUser = mongoose.Schema({
    username: String,
    signInDate: {
        type: Date
    },
    signOutDate: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('ConnectedUser', ConnectedUser, 'ConnectedUser')
