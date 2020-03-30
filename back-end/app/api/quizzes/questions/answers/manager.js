const {Answer} = require('../../../../models');
const {getQuestionFromQuiz} = require('../manager');

const filterAnswersFromQuestion = (questionId) => Answer.get().filter(
    (answer) => (answer.questionId === questionId)
);

const getAnswerFromQuestion = (quizId, questionId, answerId) => {
    const  question = getQuestionFromQuiz(quizId, questionId);
    const answer = Answer.getById(answerId);
    if (answer.questionId )
        throw new NotFoundError(`${answer.name} id=${answerId} was not found for ${question.name} id=${question.id} : not found`)

    return answerId;
};
