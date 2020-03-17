const { Router } = require('express')

const { Question } = require('../../../models')

const router = Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    res.status(200).json(Question.get())
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:quizId', (req, res) => {
  console.log(req.params)
  try {
    res.status(202).json(Question.getById(req.params.quizId))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const quiz = Question.create({ ...req.body })
    res.status(201).json(quiz)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:quizId', (req, res) => {
  console.log(req.params)
  try {
    res.status(203).json(Question.delete(req.params.quizId))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:quizId', (req, res) => {
  console.log(req.body)
  try {
    res.status(204).json(Question.update(req.params.quizId,req.body))
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
