const {Quiz, Question} = require('../../../models');

/**
 * @param quizId Id du quiz
 * @return retourne la question liée au quiz en fonction de son Id
 */

const filterQuestionsFromQuiz = (quizId) => {
    const questions = Question.get();
    const parseId = parseInt(quizId, 10);
    return questions.filter((questions) => questions.quizId === parseId)
};


/**
 * @param quizId Id du quiz
 * @param questionId Id de la question sélectionée
 * @return retourne la question associé au quiz
 * @throws NotFoundError si le numero du quiz n'est pas trouvé
 */

const getQuestionFromQuiz = (quizId, questionId) => {
    const quiz = Quiz.getById(quizId);
    const quizIdInt = parseInt(quizId, 10);
    const question = Question.getById(questionId);

    if (question.quizId !== quizIdInt)
        throw new NotFoundError(`${question.name} id=${questionId} was not found for ${quiz.name} id=${quiz.id} : not Found`);
    return question;
};

module.exports = {
    filterQuestionsFromQuiz,
    getQuestionFromQuiz,
}
