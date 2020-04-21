const {Router} = require('express')
const {GameRecorder} = require('../../models')

const router = new Router()

router.get('/', (request, response) => {
    try {
        response.status(200).json(GameRecorder.get());
    } catch (err) {
        response.status(500).json(err)
    }
})

router.post('/', (request, response) => {
    try {
        const game = GameRecorder.create(request.body);
        response.status(200).json(game)
    } catch (err) {
        response.status(500).json(err);
    }
})

router.delete('/:id', (request, response) => {
    try {
        GameRecorder.delete(request.params.id);
        response.status(200).json(game);
    } catch (err) {
        response.status(500).json(err);
    }
})

module.exports = router;
