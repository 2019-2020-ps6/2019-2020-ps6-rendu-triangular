const {Router} = require('express')
const {Answer, Quiz, Question} = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')
const AnswersRouter = require('./answers')
const {filterQuestionsFromQuizz, getQuestionFromQuiz} = require('./manager')
const QuestionMongo = require('../../../models/MongooseModels/question.model')
const QuizMongo = require('../../../models/MongooseModels/quiz.model')

const router = new Router({mergeParams: true})

router.get('/', (req, res) => {
    QuestionMongo.find({
        quizId: {$in: req.params.quizId}
    }).exec().then((questions) => {
        res.status(200).json(questions)
    })
})

router.get('/:questionId', (req, res) => {

    QuestionMongo.find({
        quizId: {$in: req.params.quizId}
    }, (err, quiz) => {
        QuestionMongo.findById({
            _id: req.params.questionId
        }, (err, question) => {
            if (err)
                res.status(404).json(err);
            else
                res.status(200).json(question)
        })
    })

})

router.post('/', (req, res) => {

    const question = new QuestionMongo({
        ...req.body
    })

    question.save((err, quest) => {
        if (err)
            res.status(404).json(err);
        else
            res.status(200).json(quest);
    })
})

router.put('/:questionId', (req, res) => {

    QuestionMongo.updateOne({
        _id: req.params.questionId
    }, ...req.body, (err, quest) => {
        if (err)
            res.status(404).json(err)
        else
            res.status(200).json(quest)
    });

})

router.delete('/:questionId', (req, res) => {

    QuestionMongo.find({
        quizId: {$in: req.params.quizId}
    }, (err, quiz) => {
        QuestionMongo.deleteOne({
            _id: req.params.questionId
        }, (err, quest) => {
            if (err)
                res.status(404).json(err)
            else
                res.status(200).json(quest)
        })
    })

})

router.use('/:questionId/answers', AnswersRouter)

module.exports = router
