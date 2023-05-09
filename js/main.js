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


// Форма, её элементы
const formQuiz = document.querySelector('.formQuiz');
const formPhone = document.getElementById('formPhone');

// Сообщение при отправке формы
const popupQuiz = document.querySelector('.popup-quiz');
const quizMessage = document.querySelector('.quiz-message');
const quizMessageTitle = document.querySelector('.quiz-message__title');
const quizMessageText = document.querySelector('.quiz-message__text');
const quizMessageImg = document.querySelector('.quiz-message__img');

// Крестик закрытия окна
const closePopupMessage = document.querySelector('.message-close');

// Чекбокс согласия
const agreement = document.querySelector('.agreement');

// Input
const inputChoice = document.querySelectorAll('.input-radio-choice');

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
	if (elem === 'field') {
		warnText.innerText = 'Заполните обязательные поля';
	}
	if (elem === 'empty') {
		warnText.innerText = 'Пожалуйста, ответьте на вопросы квиза';
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

}

// Закрываем окно об отправке
closePopupMessage.addEventListener('click', (e) => {
	e.preventDefault();
	closePopup(popupQuiz);

});

// Очищаем свойства dataSend при возврате по слайдам назад, чтобы не было путаницы
function clearPropObj(dataQuizCurrent) {
	// В цифру, обрезаем
	let keyObj = parseInt(dataQuizCurrent.slice(0, 1));

	if (keyObj === 3 || keyObj === 2) {
		let key = `step${keyObj}`;
		dataSend[key] = ''; // очистка
	}
}

/* Валидация */

/* Добавл. эл. и родителю класс error */
function formAddError(input) {
	if (!input.classList.contains('_error')) {
		input.classList.add('_error');
	}
}

// Удаление класса _error
function formRemoveError(input) {
	if (agreement.classList.contains('_error')) { // удал. кр. обводку у чекбокса
		agreement.classList.remove('_error');
	}

	if (input.classList.contains('_error')) {
		input.classList.remove('_error');
	}
}

// Проверка на пробелы, табы
function hasSpace(input) {
	return /\s/g.test(input);
}

// Проверка полей перед отправкой
function formValidate(form) {
	let error = 0;
	let formReq = document.querySelectorAll('._req'); // обязат. эл.

	for (let i = 0; i < formReq.length; i++) {
		const input = formReq[i];
		formRemoveError(input); // убир. класс error

		if (input.classList.contains('_name')) {
			// Проверка на пробелы
			let spaceInput = hasSpace(input.value);
			if (spaceInput === true) { // если есть пробелы
				formAddError(input); // добав. класс error
				error++;
			}
		}

		if (input.classList.contains('_phone')) {
			if (input.value.length < 18) { // если чисел < 18
				formAddError(input); // добав. класс error
				error++;
			}
		}
		if (input.classList.contains('_email')) {
			if (emailTest(input)) { // если проверка не пройдена
				formAddError(input); // добав. класс error
				error++;
			}
		} else if (input.getAttribute('type') === 'checkbox' && input.checked === false) { // если не включен
			formAddError(input);
			agreement.classList.add('_error'); // добавл. чекбоксу обводку красную
			error++;
		} else {
			if (input.value === '') { // если не заполнено поле
				formAddError(input);
				error++;
			}
		}

	}
	return error;

}

/* Проверка e-mail */
function emailTest(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value); // ?
}

/* Проверка поля телефона: маска */
function maskPhone(input, checkOpen, masked = '+7 (___) ___-__-__') {

	function mask(event) {
		const keyCode = event.keyCode;
		const template = masked,
			def = template.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
		let i = 0,
			newValue = template.replace(/[_\d]/g, function (a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
			});
		i = newValue.indexOf("_");
		if (i != -1) {
			newValue = newValue.slice(0, i);
		}
		let reg = template.substr(0, this.value.length).replace(/_+/g,
			function (a) {
				return "\\d{1," + a.length + "}";
			}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
			this.value = newValue;
		}
		if (event.type === "blur" && this.value.length < 5) {
			this.value = "";
		}

	}

	if (checkOpen === true) { // если слайд виден
		input.addEventListener("input", mask);
		input.addEventListener("focus", mask);
		input.addEventListener("blur", mask);

	} else if (checkOpen === false) {
		// Удаление прослушки при закрытии слайда
		input.removeEventListener("input", mask);
		input.removeEventListener("focus", mask);
		input.removeEventListener("blur", mask);
	}

}

/* Очистка объекта */
function resetDataSend(dataSend) {
	for (let key in dataSend) {
		dataSend[key] = '';
	}

}

// Убираем checked у input
function clearInputCheck() {
	inputChoice.forEach((input) => {
		if (input.checked === true) {
			input.checked = false;

		}
	});
}



/* Отправка сообщения: функция */
async function formSend(e) {
	e.preventDefault();
	let error = formValidate(formQuiz);
	let emptyData = false;

	const formData = new FormData(formQuiz); // получ. данные формы

	// Если объект не пустой, запис. данные в formData
	if (dataSend.step1 !== '' && dataSend.step2 !== '' && dataSend.step3 !== '') {
		for (let key in dataSend) {
			formData.append(key, dataSend[key]);
		}
	} else {
		emptyData = true;
	}



	// for (let pair of formData.entries()) {
	// 	console.log(pair[0] + ', ' + pair[1]); //property and value pairs
	// 	if ((pair[0] === 'step1' || pair[0] === 'step2' || pair[0] === 'step3') && pair[1] !== '') {
	// 		console.log('not empty');
	// 	}
	// }

	if (error === 0) {

		if (emptyData === false) {

			await fetch('./sendmail.php', {
					method: 'POST',
					body: formData

				})
				.then(res => res.json())
				.then((res) => {
					formQuiz.reset();
					resetDataSend(dataSend); // очистка шагов в объекте
					clearInputCheck(); // сброс checked у активных инпутов
					sendFormMessage('success'); // отправлено

				})
				.catch(() => {
					formQuiz.reset();
					resetDataSend(dataSend);
					clearInputCheck();
					sendFormMessage('wrong'); // не отправлено

				});

		} else if (emptyData === true) {
			showMessage('empty');
		}



	} else {
		showMessage('field'); // заполните поля
	}

}


// Назад кнопка
previousBtn.forEach((itemPrevious) => {
	itemPrevious.addEventListener('click', () => {
		/* Номер текущего квиза */
		let dataQuizCurrent = itemPrevious.dataset.quiz;

		// Снимаем маску(прослушку) для поля с телефоном
		if (parseInt(dataQuizCurrent) === 4) {
			let checkOpen = false;
			maskPhone(formPhone, checkOpen);
		}
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

		// Запускаем маску для поля с телефоном
		if (currentQuizNumber === 3) {
			let checkOpen = true;
			maskPhone(formPhone, checkOpen);
		}

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



/* Отправка формы */

formQuiz.addEventListener('submit', formSend);

// btnQuiz.addEventListener('click', (event) => {
// 	event.preventDefault();
// 	let error = formValidate(formQuiz);
// 	clearInputCheck();

// 	if (error === 0) {
// 		sendFormMessage('success');

// 	} else {
// 		showMessage('field');
// 	}

// });
