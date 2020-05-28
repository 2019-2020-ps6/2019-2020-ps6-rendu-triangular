const {Router} = require('express')
const {GameRecorder} = require('../../models')
const GameRecordMongo = require('../../models/MongooseModels/game-record.model')

const router = new Router()

router.get('/', (request, response) => {
    GameRecordMongo.find({}, (err, records) => {
        if (err)
            response.status(404).json(err)
        else
            response.status(202).json(records)
    })
})

router.post('/', (request, response) => {

    const recorder = new GameRecordMongo({
        ...request.body
    })

    recorder.save((err, data) => {
        if (err)
            response.status(404).json(err)
        else
            response.status(200).json(data)
    })

})

router.delete('/:id', (request, response) => {
    GameRecordMongo.findOneAndDelete({
        _id: request.params.id
    }, (err, data) => {
        if (err)
            response.status(404).json(err)
        else
            response.status(200).json(data)
    })

})

module.exports = router;
