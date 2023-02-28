'use strict';

/* Кнопки next */

const nextBtn = document.querySelectorAll('.next');
const previousBtn = document.querySelectorAll('.previous');
const quiz = document.querySelectorAll('.quiz');

/* Данные для отправки на почту*/
const dataSend = {
	step1: '',
	step2: '',
	step3: '',
};

/* Для выбора слайдов: 3a или 3b, бюджет*/
const throughOneQuiz = {
	number: ''
};

/* Для хранения в localStorage, чтобы вернуть пред. слайд */
let quizArr = [];



/* Добавление номера квиза в объект */
function addThrougOneQuiz(dataQuizCurrent, itemInput) {

	if (parseInt(dataQuizCurrent) === 1) {
		if (itemInput.dataset.throughoneQuiz) {
			throughOneQuiz.number = itemInput.dataset.throughoneQuiz;
		}
	}

}

/* Переключение слайдов назад*/
function toggleVisiblePrevious(lastIndexQiuzArr, dataQuizCurrent) {

	/* Получаем текущий и предыдущий слайды */
	let currentQuiz = document.querySelector(`[data-step="${dataQuizCurrent}"]`);
	let previousQuiz = document.querySelector(`[data-step="${lastIndexQiuzArr}"]`);

	if (currentQuiz.classList.contains('visible')) {
		currentQuiz.classList.remove('visible');
	}

	if (!previousQuiz.classList.contains('visible')) {
		previousQuiz.classList.add('visible');
	}


}

/* Переключение слайдов вперёд*/
function toggleVisibleNext(itemQuiz, itemInput, dataQuizCurrent) {

	/* Получ. след. слайд квиза */
	let btnQuizNext = itemInput.dataset.btnQuiz;

	/* Проверка при выборе варианта: 3а или 3b */
	if (dataQuizCurrent === '2ab') {
		if (throughOneQuiz.number === '3b') {
			btnQuizNext = '3b';
		}

	}
	/* Получаем нужный слайд */
	let nextQuiz = document.querySelector(`[data-step="${btnQuizNext}"]`);

	if (itemQuiz.classList.contains('visible')) {
		itemQuiz.classList.remove('visible');
	}

	if (!nextQuiz.classList.contains('visible')) {
		nextQuiz.classList.add('visible');
	}


}

/* Добавление данных в объект */
function addDataSend(currentQuizNumber, textToSend) {

	if (currentQuizNumber === 1) {
		dataSend.step1 = textToSend;
	}
	if (currentQuizNumber === 2) {
		dataSend.step2 = textToSend;
	}
	if (currentQuizNumber === 3) {
		dataSend.step3 = textToSend;
	}
}

/* Добавление текущего слайда в массив */
function addCurrentQuizArr(dataQuizCurrent) {
	quizArr.push(dataQuizCurrent);
}

// Назад кнопка
previousBtn.forEach((itemPrevious) => {
	itemPrevious.addEventListener('click', () => {
		/* Номер текущего квиза */
		let dataQuizCurrent = itemPrevious.dataset.quiz;

		// Пока массив с номерами слайдов не пустой
		if (quizArr.length !== 0) {

			// Номер предыд. квиза, сохр. в массиве
			let lastIndexQiuzArr = quizArr.pop();

			// Перекл. слайды назад
			toggleVisiblePrevious(lastIndexQiuzArr, dataQuizCurrent);


		}


	});
});


nextBtn.forEach((itemNext) => {
	itemNext.addEventListener('click', () => {


		/* Номер текущего квиза */
		let dataQuizCurrent = itemNext.dataset.quiz;
		/* Номер текущего квиза переводим в цифру и обрезаем до 1 эл., чтобы добавить в объект */
		let currentQuizNumber = parseInt(dataQuizCurrent.slice(0, 1));

		quiz.forEach((itemQuiz) => {
			let dataStep = itemQuiz.dataset.step;

			/* Совпадение по квизу при нажатии на next */
			if (dataQuizCurrent === dataStep) {


				/* Получаем кнопки(инпуты) */
				let inputRadioChoice = itemQuiz.querySelectorAll('.input-radio-choice');

				inputRadioChoice.forEach((itemInput) => {


					if (itemInput.checked) {

						/* Поиск элемента с информацией для отправки*/

						let sibling = itemInput;

						while (sibling.parentElement) {
							sibling = sibling.parentElement;

							if (sibling.classList.contains('dataToSend')) {
								break;
							}

						}

						/* Получаем текст, заносим его в объект */
						let textToSend = sibling.querySelector('.textToSend').innerText;
						addDataSend(currentQuizNumber, textToSend);

						/* Заносим данные о выборе квиза 3а или 3b в объект*/
						addThrougOneQuiz(dataQuizCurrent, itemInput);

						/* Добавл. текущ. квиза в localStorage */
						addCurrentQuizArr(dataQuizCurrent);

						/* Переключение слайдов */
						toggleVisibleNext(itemQuiz, itemInput, dataQuizCurrent);
					}


				});


			}
		});


	});
});
