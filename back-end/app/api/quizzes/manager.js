const { Quiz } = require('../../models')
const { filterQuestionsFromQuizz } = require('./questions/manager')
const { filterAnswersFromQuestion } = require('./questions/answers/manager')


const buildQuizz = (quizId) => {
  const quiz = Quiz.getById(quizId)
  const questions = filterQuestionsFromQuizz(quiz.id)
  const questionWithAnswers = questions.map((question) => {
    const answers = filterAnswersFromQuestion(question.id)
    return { ...question, answers }
  })
  return { ...quiz, questions: questionWithAnswers }
}


const buildQuizzes = () => {
  const quizzes = Quiz.get();
  return quizzes.map((quiz) => buildQuizz(quiz.id))
}

module.exports = {
  buildQuizz,
  buildQuizzes,
}
