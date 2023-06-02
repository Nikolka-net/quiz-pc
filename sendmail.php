<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require './php/phpmailer/src/Exception.php';
require './php/phpmailer/src/PHPMailer.php';
require './php/phpmailer/src/SMTP.php';

require './config.php'; // запись отдельно токена и адреса crierbot
require './dip/conf.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/'); // ошибки будут на русском

$mail->isSMTP();
// Устанавливает хост почтового сервера (Mail.ru: smtp.mail.ru, Google: smtp.gmail.com)
$mail->Host = 'smtp.yandex.ru';
// Включает SMTP-авторизацию
$mail->SMTPAuth = true;
// Логин или E-mail целиком
$mail->Username = 'nickolaiivolgin@yandex.ru';
// Пароль от почтового ящика
$mail->Password = "{$dip}";
// Протокол соединения
$mail->SMTPSecure = 'ssl';
// Порт для исходящаей почты
$mail->Port = '465';


// От кого письмо
$mail->setFrom('nickolaiivolgin@yandex.ru', 'sborka-pc.ru');
// Кому отправить
$mail->addAddress('nickolaiivolgin@yandex.ru', 'Nikolay'); // поменять
// Тема письма
$mail->Subject = 'Сообщение с сайта "Сборка пк" от клиента';

$mail->IsHTML(true); // включение тегов в письме


// Тело письма

// Для почты
$body = '<h1>Заявка на сборку или апгрейд пк</h1>';

$body .= '<h2>Контактные данные</h2>';

// Переменная для телеграм; "%0A" - это отступ строки
$messenger = "Заявка на сборку или апгрейд пк" . "%0A";

$messenger .= "Контактные данные";


if (trim(!empty($_POST['userName']))) { // если не пустая
	$body .= '<p><strong>Имя:</strong> ' . $_POST['userName'] . '</p>';
	$messenger .= "%0A" . 'Имя: ' . $_POST['userName'];
}

if (trim(!empty($_POST['phone']))) {
	$body .= '<p><strong>Телефон:</strong> ' . $_POST['phone'] . '</p>';
	$messenger .= "%0A" . 'Телефон: ' . $_POST['phone'];
}

if (trim(!empty($_POST['email']))) {
	$body .= '<p><strong>E-mail:</strong> ' . $_POST['email'] . '</p>';
	$messenger .= "%0A" . 'E-mail: ' . $_POST['email'];
}

if (trim(!empty($_POST['step1']))) {
	$body .= '<h2>Параметры</h2>';
	$messenger .= "%0A%0A" . 'Параметры';

	$step1 = $_POST['step1'];
	$body .= '<p><strong>Что нужно клиенту:</strong> ' . $step1 . '</p>';
	$messenger .= "%0A" . 'Что нужно клиенту: ' . $step1;
}

if (trim(!empty($_POST['step2']))) {
	$step2 = $_POST['step2'];
	$body .= '<p><strong>Какой компьютер нужен или что хотите улучшить:</strong> ' . $step2 . '</p>';
	$messenger .= "%0A" . 'Какой компьютер вам нужен или что вы хотите улучшить: ' . $step2;
}
if (trim(!empty($_POST['step3']))) {
	$step3 = $_POST['step3'];
	$body .= '<p><strong>Бюджет:</strong> ' . $step3 . '</p>';
	$messenger .= "%0A" . 'Бюджет: ' . $step3;
}

/* Отправка сообщения боту телеграм @My_Web_Message_bot */

$sendTextToTelegram = file_get_contents("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$messenger}");


$mail->Body = $body; // Собранную переменную присваиваю в плагин

// Отправление
if (!$mail->send()) {
	$message = 'Ошибка при отправке';
} else {
	$message = 'Данные отправлены!';
}

$response = ['message' => $message]; // ответ с сообщением

header('Content-type: application/json'); // кодирую в json
echo json_encode($response); // возвращ. заголовком json обратно в js
