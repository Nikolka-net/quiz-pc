'use strict';

/* Кнопки next and previous*/
const nextBtn = document.querySelectorAll('.next');
const previousBtn = document.querySelectorAll('.previous');

// Квиз
const quiz = document.querySelectorAll('.quiz');

// Сообщение-предупреждение
const popupWarn = document.querySelector('.popupWarn');
const warn = document.querySelector('.warn');
const warnText = document.querySelector('.warn__text');

// Кнопка отправки
const btnQuiz = document.querySelector('.formQuiz__button');


// Сообщение при отправке формы
const popupQuiz = document.querySelector('.popup-quiz');
const quizMessage = document.querySelector('.quiz-message');
const quizMessageTitle = document.querySelector('.quiz-message__title');
const quizMessageText = document.querySelector('.quiz-message__text');
const quizMessageImg = document.querySelector('.quiz-message__img');

// Крестик закрытия окна
const closePopupMessage = document.querySelector('.message-close');

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

/* Для хранения номеров слайдов, чтобы вернуть пред. слайд */
let quizArr = [];



/* Добавление номера квиза в объект */
function addThrougOneQuiz(dataQuizCurrent, input) {

	if (parseInt(dataQuizCurrent) === 1) {
		if (input.dataset.throughoneQuiz) {
			throughOneQuiz.number = input.dataset.throughoneQuiz;
		}
	}

}

/* Переключение слайдов назад*/
function toggleVisiblePrevious(lastIndexQiuzArr, dataQuizCurrent) {


	quiz.forEach((quizItem) => {

		let number = quizItem.dataset.step;
		//Удал. или добав. классы в зависим. от условия
		if (number === dataQuizCurrent) {
			if (quizItem.classList.contains('visible')) {
				quizItem.classList.remove('visible');
			}

		}
		if (number === lastIndexQiuzArr) {
			if (!quizItem.classList.contains('visible')) {
				quizItem.classList.add('visible');
			}
		}
	});

}

/* Переключение слайдов вперёд*/
function toggleVisibleNext(itemQuiz, input, dataQuizCurrent) {

	/* Получ. след. слайд квиза */
	let btnQuizNext = input.dataset.btnQuiz;

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

/* Появл. сообщ. о заполнении квиза */
function showMessage(elem) {

	if (elem === 'option') {
		warnText.innerText = 'Пожалуйста, выберите ваш вариант!';
	}

	popupWarn.classList.add('open');
	warn.classList.add(elem);
	setTimeout(function () {
		warn.classList.remove(elem);
		closePopup(popupWarn);
	}, 3000);
}

// Закрытие всплыв. окна
function closePopup(elem) {
	if (elem.classList.contains('open')) {
		elem.classList.remove('open');
	}

	setTimeout(function () {

		if (document.querySelector('.quiz-message__content')) {

			let quizMessageContent = document.querySelector('.quiz-message__content');
			// Удаляем сообщение, чтобы не дублировалось при нажатии на кнопку
			quizMessageContent.remove();
		}

	}, 1000);
}

// Открытие окна
function openPopup(elem) {
	if (!elem.classList.contains('open')) {
		elem.classList.add('open');
	}

}

// Сообщение при отправке формы
function sendFormMessage(elem) {

	if (elem === 'success') {

		let messageAfterSendSuccess = `
		<div class="quiz-message__content">
		<h3 class="quiz-message__title">Сообщение отправлено!</h3>
		<p class="quiz-message__text">Мы свяжемся с&nbsp;вами в&nbsp;течение
			дня, чтобы рассказать
			о&nbsp;ценах и&nbsp;сроках</p>
		<img src="./image/icons/success.svg" alt="Успешно отправлено!" class="quiz-message__img">
		</div>
		`;
		quizMessage.insertAdjacentHTML('beforeend', messageAfterSendSuccess);

	} else if (elem === 'wrong') {

		let messageAfterSendWrong = `
		<div class="quiz-message__content">
		<h3 class="quiz-message__title">Сообщение не отправлено</h3>
		<p class="quiz-message__text">Не волнуйтесь, просто
		попробуйте&nbsp;позднее</p>
		</div>
		`;
		quizMessage.insertAdjacentHTML('beforeend', messageAfterSendWrong);
	}

	// Октрытие окна
	openPopup(popupQuiz);


	setTimeout(function () {

		// Чтобы не сработало 2 раз, при нажатии на крестик
		if (popupQuiz.classList.contains('open')) {
			closePopup(popupQuiz);

		}
	}, 4000);
}

// Закрываем окно об отправке
closePopupMessage.addEventListener('click', (e) => {
	e.preventDefault();
	closePopup(popupQuiz);

});

// Очищаем свойства dataSend при возврате назад, чтобы не было путаницы
function clearPropObj(dataQuizCurrent) {
	// В цифру, обрезаем
	let keyObj = parseInt(dataQuizCurrent.slice(0, 1));

	if (keyObj === 3 || keyObj === 2) {
		let key = `step${keyObj}`;
		dataSend[key] = ''; // очистка
	}
}

// Назад кнопка
previousBtn.forEach((itemPrevious) => {
	itemPrevious.addEventListener('click', () => {
		/* Номер текущего квиза */
		let dataQuizCurrent = itemPrevious.dataset.quiz;
		// очистка объекта при возврате
		clearPropObj(dataQuizCurrent);

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

				// Для проверки и вывода сообщения, если не выбр. вариант
				let check = false;
				let input = '';

				inputRadioChoice.forEach((itemInput) => {

					/* Check */
					if (itemInput.checked) {
						check = true;
						input = itemInput;
					}
					/* /Check */

				});

				if (check === true) {

					/* Поиск элемента с информацией для отправки*/

					// Ближайший родитель с нужным классом
					let parentInput = input.closest('.dataToSend');

					/* Получаем текст, заносим его в объект */
					let textToSend = parentInput.querySelector('.textToSend').innerText;
					addDataSend(currentQuizNumber, textToSend);

					/* Заносим данные о выборе квиза 3а или 3b в объект*/
					addThrougOneQuiz(dataQuizCurrent, input);

					/* Добавл. текущ. квиза в массив */
					addCurrentQuizArr(dataQuizCurrent);

					/* Переключение слайдов */
					toggleVisibleNext(itemQuiz, input, dataQuizCurrent);
				} else if (check === false) {
					// Всплыв. сообщение, "выберите вариант"
					showMessage('option');
				}



			}
		});


	});
});



btnQuiz.addEventListener('click', () => {

	sendFormMessage('success');
});
