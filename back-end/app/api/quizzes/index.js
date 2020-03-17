const { Router } = require('express')

const { Quiz } = require('../../models')

const questRouter = require('./questions')

const router = new Router()

/**
 * recupère la liste des quizzes
 */
router.get('/', (req, res) => {
  try {
    res.status(200).json(Quiz.get())
    res.status(100).json(questRouter)
  } catch (err) {
    res.status(500).json(err)
  }
})
/**
 * Recupère un quiz par son id
 */
router.get('/:quizId', (req, res) => {
  console.log(req.params)
  try {
    res.status(202).json(Quiz.getById(req.params.quizId))
  } catch (err) {
    res.status(500).json(err)
  }
})

/**
 * Supprime un quiz par son ID
 */
router.delete('/:quizId', (req, res) => {
  console.log(req.params)
  try {
    res.status(203).json(Quiz.delete(req.params.quizId))
  } catch (err) {
    res.status(500).json(err)
  }
})
/**
 * Crée un quiz
 */
router.post('/', (req, res) => {
  try {
    const quiz = Quiz.create({ ...req.body })
    res.status(201).json(quiz)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

/**
 * Modifier un quiz
 */

router.put('/:quizId', (req, res) => {
  console.log(req.body)
  try {
    res.status(204).json(Quiz.update(req.params.quizId,req.body))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.use('/:quizId', questRouter)

module.exports = router
