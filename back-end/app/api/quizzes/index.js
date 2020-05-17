const {Router} = require('express')
const {Quiz} = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const QuestionsRouter = require('./questions')
const {buildQuizz, buildQuizzes} = require('./manager')
const QuizMongo = require('../../models/MongooseModels/quiz.model')

const router = new Router()

router.use('/:quizId/questions', QuestionsRouter)

router.get('/', (req, res) => {
    QuizMongo.find({}, (err, quizzes) => {
        if (err)
            res.status(404).json(err)
        else
            res.status(200).json(quizzes)
    })
})

router.get('/:quizId', (req, res) => {
    QuizMongo.findOne({_id: req.params.quizId}, (err, quiz) => {
        console.log(quiz);
        res.status(200).json(quiz)
    });
})

router.post('/', (req, res) => {
    delete req.params._id;
    const quiz1 = new QuizMongo({
        ...req.body
    })

    quiz1.save().then(() => {
        res.status(201).json(quiz1)
    }).catch((err) => {
        res.status(400).json(err);
    });
})

router.put('/:quizId', (req, res) => {

    QuizMongo.updateOne({
        _id: req.params.quizId
    }, {
        ...req.body
        //_id: req.params.quizId
    }).then(() => {
        res.status(200).json({"message": "updated"})
    }).catch((err) => {
        res.status(404).json(err)
    })
})

router.delete('/:quizId', (req, res) => {

    QuizMongo.find({
        _id: req.params.quizId
    }, (err, del) => {
        if (err)
            res.status(404).json(err)
        else
            res.status(200).json(del + {message: 'deleted'});
    })
})

module.exports = router
