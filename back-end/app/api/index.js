const {Router} = require('express')
const QuizzesRouter = require('./quizzes')
const UserRouter = require('./users')
const GameRecorderRouter = require('./game-record')
const ConnectedUserRouter = require('./connected-user')
const QuizColorRouter = require('./quiz-color')
const PatientRouter = require('./users/patient')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/users', UserRouter)
router.use('/game-record', GameRecorderRouter)
router.use('/connected-user', ConnectedUserRouter)
router.use('/quiz-color', QuizColorRouter)

module.exports = router
