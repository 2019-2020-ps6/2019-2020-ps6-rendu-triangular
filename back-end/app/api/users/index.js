const { Router } = require('express')

const { User } = require('../../models')

const router = new Router()

/**
 * recupère la liste des users
 */
router.get('/', (req, res) => {
  try {
    res.status(200).json(User.get())
  } catch (err) {
    res.status(500).json(err)
  }
})
/**
 * Recupère un user par son id
 */
router.get('/:quizId', (req, res) => {
  console.log(req.params)
  try {
    res.status(202).json(User.getById(req.params.quizId))
  } catch (err) {
    res.status(500).json(err)
  }
})

/**
 * Supprime un user par son ID
 */
router.delete('/:quizId', (req, res) => {
  console.log(req.params)
  try {
    res.status(203).json(User.delete(req.params.quizId))
  } catch (err) {
    res.status(500).json(err)
  }
})
/**
 * Crée un user
 */
router.post('/', (req, res) => {
  try {
    const quiz = User.create({ ...req.body })
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
 * Modifier un user
 */

router.put('/:quizId', (req, res) => {
  console.log(req.body)
  try {
    res.status(204).json(User.update(req.params.quizId,req.body))
  } catch (err) {
    res.status(500).json(err)
  }
})


module.exports = router
