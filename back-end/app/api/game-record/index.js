const {Router} = require('express')
const {GameRecorder} = require('../../models')
const GameRecordMongo = require('../../models/MongooseModels/game-record.model')

const router = new Router()

router.get('/', (request, response) => {
    try {
        GameRecordMongo.find().exec().then((data) => {
            response.status(200).json(data)
        }).catch((err) => {
            response.status(404).json(err);
        })

        response.status(200).json(GameRecordMongo.get());
    } catch (err) {
        response.status(500).json(err)
    }
})

router.post('/', (request, response) => {
    try {
        const recorder = new GameRecordMongo({
            ...request.body
        })

        recorder.save().then(() => {
            response.status(200).json(recorder)
        }).catch((err) => {
            response.status(404).json(err)
        })

        const game = GameRecorder.create(request.body);
        response.status(200).json(game)
    } catch (err) {
        response.status(500).json(err);
    }
})

router.delete('/:id', (request, response) => {
    try {

        GameRecordMongo.findOneAndDelete({
            _id: request.params.id
        }).then(() => {
            response.status(200).json({"message": "deleted"})
        }).catch((err) => {
            response.status(404).json(err)
        })

        GameRecorder.delete(request.params.id);
        response.status(200).json(game);
    } catch (err) {
        response.status(500).json(err);
    }
})

module.exports = router;
