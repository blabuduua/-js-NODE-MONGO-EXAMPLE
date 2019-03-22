// ДЛЯ ПОДКЛЮЧЕНИЯ ФРЕЙМВОРКА ЕКСПРЕСС
var app = require('express')();
// ДЛЯ ПОДКЛЮЧЕНИЯ МОДУЛЯ СЕРВЕРА
var http = require('http').Server(app);
// ДЛЯ ПОДКЛЮЧЕНИЯ МОДУЛЯ СОКЕТ
var io = require('socket.io')(http);


// ДЛЯ ОБРАБОТКИ РОУТА ГЛАВНОЙ СТРАНИЦЫ
app.get('/', function (request, response) {
	response.sendFile(__dirname + '/index.html');
});


// ДЛЯ ПРОСЛУШИВАНИЯ ПОДКЛЮЧЕНИЙ
io.on('connection', function (soket) {
	var user = Date.now();

	// ДЛЯ ПРОСЛУШИВАНИЯ СОБЫТИЯ ОТПРАВКИ СООБЩЕНИЯ СО СТОРОНЫ ПОЛЬЗОВАТЕЛЯ
	soket.on('message.sent', function (message) {
		io.emit('message', user + ': ' + message);
	});

	// ДЛЯ ОТПРАВЛЕНИЯ СООБЩЕНИЯ ПОЛЬЗОВАТЕЛЮ
	io.emit('message', 'User '+ user +' connected');
});


// ДЛЯ СОЗДАНИЯ СЕРВЕРА НА 3000 ПОРТЕ
http.listen(80, function () {
	console.log('started server');
});