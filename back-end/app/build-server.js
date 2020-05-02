const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const api = require('./api')
const mongoose = require('mongoose')
require('dotenv/config')

const mongoUrl = "mongodb+srv://Admin:admin@polyquiz-brgcu.gcp.mongodb.net/test?retryWrites=true&w=majority"


module.exports = (cb) => {

    mongoose.connect(mongoUrl, {
        dbName: 'PolyqQuiz',
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Database Connected")

    }).catch((err) => {
        console.log(err);
    })

    const app = express()
    app.disable('x-powered-by')
    app.use(cors())
    app.use(bodyParser.json({limit: '50mb'}))
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    app.use(morgan('[:date[iso]] :method :url :status :response-time ms - :res[content-length]'))
    app.use('/api', api)
    app.use('*', (req, res) => res.status(404).end())
    const server = app.listen(process.env.PORT || 9428, () => cb && cb(server))
}
