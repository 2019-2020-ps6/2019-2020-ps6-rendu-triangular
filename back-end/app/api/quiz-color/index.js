const {Router} = require('express')
const {ColorQuiz} = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const {buildQuizz, buildQuizzes} = require('./manager')

const router = new Router();


router.get('/', (request, response) => {
    try {
        const quizzes = buildQuizzes()
        response.status(200).json(quizzes)
    } catch (err) {
        manageAllErrors(response, err)
    }
})

router.get('/:quizId', (request, response) => {
    try {
        const quizz = buildQuizz(request.params.quizId)
        response.status(200).json(quizz)
    } catch (err) {
        manageAllErrors(response, err)
    }
})

router.post('/', (request, response) => {
    try {
        const quiz = ColorQuiz.create({...request.body})
        //const quiz = QuizColor.create({name:req.body.name, color: req.body.color, value:req.body.value})
        response.status(201).json(quiz)
    } catch (err) {
        manageAllErrors(response, err)
    }
})

router.put('/:quizId', (request, response) => {
    try {
        response.status(200).json(ColorQuiz.update(request.params.quizId, request.body))
    } catch (err) {
        manageAllErrors(response, err)
    }
})

router.delete('/:quizId', (request, response) => {
    try {
        ColorQuiz.delete(request.params.quizId)
        response.status(204).end()
    } catch (err) {
        manageAllErrors(response, err)
    }
})

module.exports = router;
