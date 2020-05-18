const {Router} = require('express')
const {User} = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const Patient = require('./patient')
const UserMongo = require('../../models/MongooseModels/user.model')

const router = new Router()

router.use('/patients', Patient)

router.get('/', (req, res) => {
    UserMongo.find({}, (err, data) => {
        if (err)
            res.status(404).json(err);
        else
            res.status(200).json(data);
    })
})

router.get('/:userId', (req, res) => {
    try {
        UserMongo.findOne({_id: req.params.userId}, (err, quiz) => {
            console.log(quiz);
        });

    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.post('/', (req, res) => {
    try {
        const userMong = new UserMongo({
            ...req.body
        })

        userMong.save().then(() => {
            res.status(201).json(userMong)
        }).catch((err) => {
            res.status(400).json(err);
        });

    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.put('/:userId', (req, res) => {
    try {

        UserMongo.updateOne({
            _id: req.params.userId
        }, {
            ...req.body,
            _id: req.params.userId
        }).then(() => {
            res.status(200).json({"message": "updated"})
        }).catch((err) => {
            res.status(404).json(err)
        })

    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.delete('/:userId', (req, res) => {
    try {

        UserMongo.findOneAndDelete({
            _id: req.params.userId
        }).then(() => {
            res.status(200).json({"message": "deleted"})
        }).catch((err) => {
            res.status(404).json(err)
        })

    } catch (err) {
        manageAllErrors(res, err)
    }
})

module.exports = router
