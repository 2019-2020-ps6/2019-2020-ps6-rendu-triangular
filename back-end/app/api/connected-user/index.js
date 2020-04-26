const {Router} = require('express')
const {ConnectedUser} = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router();

router.get('/', (request, response) => {
    try {
        response.status(200).json(ConnectedUser.get());
    } catch (err) {
        manageAllErrors(response, err)
    }
})

router.post('/', (request, response) => {
    try {
        const game = ConnectedUser.create(request.body);
        response.status(200).json(game)
    } catch (err) {
        manageAllErrors(response, err)
    }
})

router.delete('/:id', (request, response) => {
    try {
        ConnectedUser.delete(request.params.id);
        response.status(200).json(game);
    } catch (err) {
        manageAllErrors(response, err)
    }
})

module.exports = router

