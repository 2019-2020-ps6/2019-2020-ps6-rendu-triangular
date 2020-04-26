const {ColorQuiz} = require('../../models')

const buildQuizz = (quizId) => {
    const quiz = ColorQuiz.getById(quizId)

    return {...quiz,}
}

const buildQuizzes = () => {
    const quizzes = ColorQuiz.get();
    return quizzes.map((quiz) => buildQuizz(quiz.id))
}

module.exports = {
    buildQuizz,
    buildQuizzes,
}
