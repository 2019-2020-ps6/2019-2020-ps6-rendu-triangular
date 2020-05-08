const {Router} = require('express')
const {ColorQuiz} = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const {buildQuizz, buildQuizzes} = require('./manager')
const mongoose = require('mongoose')
const QuizColor = require('../../models/MongooseModels/quiz-color.model')

const router = new Router();

router.get('/', (request, response) => {
    try {
        const quizzes = buildQuizzes()
        QuizColor.find().exec().then((quiz) => {
            console.log(quiz);
            response.status(200).json(quiz)
        })
        //response.status(200).json(quizzes);
    } catch (e) {
        response.status(404).json(e);
    }
})

router.get('/:quizId', (request, response) => {
    try {
        const quizz = buildQuizz(request.params.quizId)
        QuizColor.findOne({_id: request.params.quizId}, (err, quiz) => {
            console.log(quiz);
        });

        // response.status(200).json(quizz)
    } catch (err) {
        manageAllErrors(response, err)
    }
})

router.post('/', async (request, response) => {
    try {
        const quiz = await ColorQuiz.create({...request.body})
        const quizColor = new QuizColor({
            ...request.body
        })

        quizColor.save().then(() => {
            response.status(201).json(quizColor)
        }).catch((err) => {
            response.status(400).json(err);
        });

        // response.status(201).json(quiz)
    } catch (err) {
        manageAllErrors(response, err)
    }
})

router.put('/:quizId', (request, response) => {
    try {
        QuizColor.updateOne({
            _id: request.params.quizId
        }, {
            ...request.body,
            _id: request.params.quizId
        }).then(() => {
            response.status(200).json({"message": "updated"})
        }).catch((err) => {
            response.status(404).json(err)
        })


        // response.status(200).json(ColorQuiz.update(request.params.quizId, request.body))
    } catch (err) {
        manageAllErrors(response, err)
    }
})

router.delete('/:quizId', (request, response) => {
    try {
        QuizColor.findOneAndDelete({
            _id: request.params.quizId
        }).then(() => {
            response.status(200).json({"message": "deleted"})
        }).catch((err) => {
            response.status(404).json(err)
        })

        // ColorQuiz.delete(request.params.quizId)
        // response.status(204).end()
    } catch (err) {
        manageAllErrors(response, err)
    }
})

module.exports = router;
