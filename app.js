// ДЛЯ ПОДКЛЮЧЕНИЯ ФРЕЙМВОРКА
const express = require('express');
const app = express();


// ДЛЯ ПОДКЛЮЧЕНИЯ ИНТЕРФЕЙСА ДЛЯ БАЗЫ ДАННЫХ
const mongoose = require('mongoose');


// ДЛЯ ПОДКЛЮЧЕНИЯ ЛОГЕРА
const morgan = require('morgan');


// ДЛЯ ПОДКЛЮЧЕНИ МОДУЛЯ ДЛЯ РАЗБИВКИ ЕКСПРЕСОМ ЗАПРОСА REQ.BODY
const bodyParser = require('body-parser');


// ДЛЯ ПОДКЛЮЧЕНИЯ ФАЙЛА НАСТРОЕК
const dotenv = require('dotenv');
dotenv.config();


// ДЛЯ ПОДКЛЮЧЕНИЯ К БАЗЕ ДАННЫХ
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
    .then(() => console.log('DB connected'));


// ДЛЯ ОТЛОВА ОШИБОК ПОДКЛЮЧЕНИЯ К БАЗЕ ДАННЫХ
mongoose.connection.on('error', err => {
    console.log(`Connection error ${err.message}`);
});


// ДЛЯ ОПРЕДЕЛЕНИЯ И ИСПОЛЬЗОВАНИЯ ПОСРЕДНИКА
const testMiddleware = (req, res, next) => {
    console.log('Middleware here!!!');
    // res.send('From Middleware');
    next();
};
// app.use(testMiddleware);


// ДЛЯ ИСПОЛЬЗОВАНИЯ ЛОГЕРА В РЕЖИМЕ РАЗРАБОКИ
app.use(morgan('dev'));

app.use(bodyParser.json());

// ДЛЯ ПОДКЛЮЧЕНИЯ КОНТРОЛЛЕРОВ И ОПРЕДЕЛЕНИЯ РОУТОВ
const routesPost = require('./routes/routes_post');
app.use('/', routesPost);


// ДЛЯ ОПРЕДЕЛЕНИЯ ПОРТА И ЗАПУСКА СЕРВЕРА
const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`Server Started! on ${port}`);
});