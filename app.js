// ДЛЯ ПОДКЛЮЧЕНИЯ ФРЕЙМВОРКА
const express = require('express');
const app = express();


// ДЛЯ ПОДКЛЮЧЕНИЯ ИНТЕРФЕЙСА ДЛЯ БАЗЫ ДАННЫХ
const mongoose = require('mongoose');


// ДЛЯ ПОДКЛЮЧЕНИЯ ЛОГЕРА
const morgan = require('morgan');


// ДЛЯ ПОДКЛЮЧЕНИЯ МОДУЛЯ ДЛЯ РАЗБИВКИ ЕКСПРЕСОМ ЗАПРОСА REQ.BODY
const bodyParser = require('body-parser');


// ДЛЯ ПОДКЛЮЧЕНИЯ МОДУЛЯ ДЛЯ РАЗБОРА COOKIE
const cookieParser = require('cookie-parser');


// ДЛЯ ПОДКЛЮЧЕНИЯ EXPRESS-VALIDATOR ДЛЯ ОТЛОВА ОШИБОК ВАЛИДАЦИЙ ФОРМ
const expressValidator = require('express-validator');


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


// =============================================================================
// START MIDDLEWARE
// =============================================================================

// ДЛЯ ИСПОЛЬЗОВАНИЯ ЛОГЕРА В РЕЖИМЕ РАЗРАБОКИ
app.use(morgan('dev'));

// ДЛЯ ИСПОЛЬЗОВАНИЯ ПАРСЕРА JSON ДАННЫХ ПРИШЕДШИХ ПО API
app.use(bodyParser.json());

// ДЛЯ ИСПОЛЬЗОВАНИЯ ПАРСЕРА COOKIE
app.use(cookieParser());

// ДЛЯ ИСПОЛЬЗОВАНИЯ ПЕРЕХВАТЧИКА ОШИБОК ВАЛИДАЦИИ ФОРМ
app.use(expressValidator());

// ДЛЯ ПОДКЛЮЧЕНИЯ КОНТРОЛЛЕРОВ И ОПРЕДЕЛЕНИЯ РОУТОВ
const routesPost = require('./routes/routes_post');
app.use('/', routesPost);

const routesAuth = require('./routes/routes_auth');
app.use('/', routesAuth);

// =============================================================================
// END MIDDLEWARE
// =============================================================================


// ДЛЯ ОПРЕДЕЛЕНИЯ ПОРТА И ЗАПУСКА СЕРВЕРА
const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`Server Started! on ${port}`);
});