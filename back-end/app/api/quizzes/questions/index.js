const {Router} = require('express')
const {Answer, Quiz, Question} = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')
const AnswersRouter = require('./answers')
const {filterQuestionsFromQuizz, getQuestionFromQuiz} = require('./manager')
const QuestionMongo = require('../../../models/MongooseModels/question.model')
const QuizMongo = require('../../../models/MongooseModels/quiz.model')

const router = new Router({mergeParams: true})

router.get('/', (req, res) => {
    /*try {
      Quiz.getById(req.params.quizId)
      res.status(200).json(filterQuestionsFromQuizz(req.params.quizId))
    } catch (err) {
      manageAllErrors(res, err)
    }*/

    QuizMongo.findOne({
        _id: req.params.quizId,
    }, (err, quiz) => {
        QuestionMongo.find().exec().then((questions) => {
            res.status(200).json(questions)
        })
    });

})

router.get('/:questionId', (req, res) => {
    /*try {
      const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
      res.status(200).json(question)
    } catch (err) {
      manageAllErrors(res, err)
    }*/

    QuizMongo.findOne({
        _id: req.params.quizId
    }, (quiz) => {
        QuestionMongo.findOne({
            _id: req.params.questionId
        }, (question) => {
            res.status(200).json(question)
        })
    })

})

router.post('/', (req, res) => {
    /*try {
      Quiz.getById(req.params.quizId)
      const quizId = parseInt(req.params.quizId, 10)
      let question = Question.create({label: req.body.label, image: req.body.image, quizId})
      if (req.body.answers && req.body.answers.length > 0) {
        const answers = req.body.answers.map((answer) => Answer.create({...answer, questionId: question.id}))
        question = {...question, answers}
      }
      res.status(201).json(question)
    } catch (err) {
      manageAllErrors(res, err)
    }*/

    QuizMongo.findOne({
        _id: req.params.quizId
    }, (quiz) => {
        const question = new QuestionMongo({
            label: req.body.label,
            image: req.body.image,
            quizId: req.params.quizId,
            answers: req.body.answers
        })

        question.save().then(() => {
            res.status(201).json(question)
        }).catch(err => {
            res.status(400).json(err);
        })
    })

})

router.put('/:questionId', (req, res) => {
    /*try {
      const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
      const updatedQuestion = Question.update(req.params.questionId, {
        label: req.body.label,
        image: req.body.image,
        quizId: question.quizId
      })
      res.status(200).json(updatedQuestion)
    } catch (err) {
      manageAllErrors(res, err)
    }*/

    QuestionMongo.updateOne({
        ...req.body,
        _id: req.params.questionId
    }).then(() => {
        res.status(200).json({"message": "updated"})
    }).catch((err) => {
        res.status(404).json(err)
    })

})

router.delete('/:questionId', (req, res) => {
    /*try {
      getQuestionFromQuiz(req.params.quizId, req.params.questionId)
      Question.delete(req.params.questionId)
      res.status(204).end()
    } catch (err) {
      manageAllErrors(res, err)
    }*/

    QuizMongo.findOne({
        _id: req.params.quizId
    }, (quiz) => {
        QuestionMongo.findOneAndDelete({
            _id: req.params.questionId
        }, (question) => {
            res.status(200).json(question)
        })
    })

})

router.use('/:questionId/answers', AnswersRouter)

module.exports = router
