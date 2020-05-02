const {Router} = require('express')
const {User} = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const Patient = require('./patient')
const UserMongo = require('../../models/MongooseModels/user.model')

const router = new Router()

router.use('/patients', Patient)

router.get('/', (req, res) => {
    try {
        UserMongo.find().exec().then((quiz) => {
            console.log(quiz);
            res.status(200).json(quiz)
        })


        res.status(200).json(User.get())
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.get('/:userId', (req, res) => {
  try {
      UserMongo.findOne({_id: req.params.userId}, (err, quiz) => {
          console.log(quiz);
      });

      res.status(200).json(User.getById(req.params.userId))
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
          req.status(201).json(userMong)
      }).catch((err) => {
          req.status(400).json(err);
      });

      const user = User.create({...req.body})
      res.status(201).json(user)
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

      res.status(200).json(User.update(req.params.userId, req.body))
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

      User.delete(req.params.userId)
      res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
