const { Router } = require('express')
const { Quiz } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const QuestionsRouter = require('./questions')
const {buildQuizz, buildQuizzes} = require('./manager')
const QuizMongo = require('../../models/MongooseModels/quiz.model')

const router = new Router()

router.use('/:quizId/questions', QuestionsRouter)

router.get('/', (req, res) => {
  try {
    const quizzes = buildQuizzes()
    res.status(200).json(quizzes)
  } catch (err) {
    manageAllErrors(res, err)
  }

  /*QuizMongo.find().exec().then((quizzes) => {
    res.status(200).json(quizzes)
  }).catch((err) => {
    res.status(404).json(err)
  })*/
})

router.get('/:quizId', (req, res) => {
  try {
    const quizz = buildQuizz(req.params.quizId)
    res.status(200).json(quizz)
  } catch (err) {
    manageAllErrors(res, err)
  }

  /*QuizMongo.findOne({_id: req.params.quizId}, (err, quiz) => {
    console.log(quiz);
    res.status(200).json(quiz)
  });*/
})

router.post('/', (req, res) => {
  try {
    const quiz = Quiz.create({...req.body})
    res.status(201).json(quiz)
  } catch (err) {
    manageAllErrors(res, err)
  }

  /*delete req.params._id;
  const quiz1 = new QuizMongo({
    ...req.body
  })

  quiz1.save().then(() => {
    res.status(201).json(quiz1)
  }).catch((err) => {
    res.status(400).json(err);
  });*/
})

router.put('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.update(req.params.quizId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }

  /*QuizMongo.updateOne({
     _id: req.params.quizId
   }, {
     ...req.body,
     _id: req.params.quizId
   }).then(() => {
     res.status(200).json({"message": "updated"})
   }).catch((err) => {
     res.status(404).json(err)
   })*/
})

router.delete('/:quizId', (req, res) => {
  try {
    Quiz.delete(req.params.quizId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }

  /*QuizMongo.findOneAndDelete({
    _id: req.params.quizId
  }).then(() => {
    res.status(200).json({"message": "deleted"})
  }).catch((err) => {
    res.status(404).json(err)
  });*/
})

module.exports = router
