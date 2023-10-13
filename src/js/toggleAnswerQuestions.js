export const toggleAnswerQuestions = () => {
  const questions = document.querySelectorAll('.questions-item-header');

  const clickQuestionHandler = event => {
    const question = event.target;
    const answer = event.target.nextElementSibling;
    question.classList.toggle('active');
    answer.classList.toggle('visually-hidden');
  };

  // View or hide the answer to a question
  questions.forEach(question => {
    question.addEventListener('click', clickQuestionHandler);
  });
};
