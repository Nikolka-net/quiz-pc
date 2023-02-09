'use strict';

/* Кнопки next */

const nextBtn = document.querySelectorAll('.next');
const inputRadioChoice = document.querySelectorAll('.input-radio-choice');

nextBtn.forEach((itemNext) => {
	itemNext.addEventListener('click', (e) => {
		console.log('e: ', e);
		let dataQuiz = itemNext.dataset.quiz;
		let focus = itemNext.autofocus;
		console.log('focus: ', focus);
		console.log('nextBtn: ', nextBtn);

	});
});

inputRadioChoice.forEach((itemInput) => {
	itemInput.addEventListener('click', (e) => {
		console.log('e: ', e);
		let btnQuiz = itemInput.dataset.btnQuiz;
	});
});
