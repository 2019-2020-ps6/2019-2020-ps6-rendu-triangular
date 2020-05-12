const mongoose = require('mongoose')

const mongoUrl = "mongodb+srv://Admin:admin@polyquiz-brgcu.gcp.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(mongoUrl, {
    dbName: 'PolyqQuiz',
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database Connected")

}).catch((err) => {
    console.log(err);
})

module.exports = mongoose
