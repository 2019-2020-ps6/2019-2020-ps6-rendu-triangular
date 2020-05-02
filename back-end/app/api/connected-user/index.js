const {Router} = require('express')
const {ConnectedUser} = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const ConnectedUserMongo = require('../../models/MongooseModels/connected-user.model')

const router = new Router();

router.get('/', (request, response) => {
    try {
        ConnectedUser.find().exec().then((data) => {
            response.status(200).json(data)
        }).catch((err) => {
            response.status(404).json(err);
        })

        response.status(200).json(ConnectedUser.get());
    } catch (err) {
        manageAllErrors(response, err)
    }
})

router.post('/', (request, response) => {
    try {
        const user = new ConnectedUser({
            ...request.body
        })

        user.save().then(() => {
            response.status(200).json(user)
        }).catch((err) => {
            response.status(404).json(err)
        })

        const game = ConnectedUser.create(request.body);
        response.status(200).json(game)
    } catch (err) {
        manageAllErrors(response, err)
    }
})

router.delete('/:id', (request, response) => {
    try {

        ConnectedUserMongo.findOneAndDelete({
            _id: request.params.id
        }).then(() => {
            response.status(200).json({"message": "deleted"})
        }).catch((err) => {
            response.status(404).json(err)
        })

        ConnectedUser.delete(request.params.id);
        response.status(200).json(game);
    } catch (err) {
        manageAllErrors(response, err)
    }
})

module.exports = router

