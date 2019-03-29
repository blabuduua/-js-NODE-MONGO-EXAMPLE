// ДЛЯ ПОДКЛЮЧЕНИЯ МОДУЛЯ ЕКСПРЕСС
const express = require('express');

// ДЛЯ ПОДКЛЮЧЕНИЯ МОДУЛЯ УПРАВЛЕНИЯ БД ДЛЯ ПОДКЛЮЧЕНИЯ К БД
const mongoose = require('mongoose');

// ДЛЯ ПОДКЛЮЧЕНИЯ МОДУЛЯ ПОЛУЧЕНИЯ ДАННЫХ ОТПРАВЛЕННЫХ ПОЛЬЗОВАТЕЛЕМ
const bodyParser = require('body-parser');

// ДЛЯ ПОДКЛЮЧЕНИЕ КЛЮЧЕЙ ПОДКЛЮЧЕНИЯ К БД
const keys = require('./config/keys');

// ДЛЯ ПОДКЛЮЧЕНИЯ К МОНГО БД ПО УРЛ
// ДЛЯ ДЕЙСТВИЙ ПОСЛЕ ПОДКЛЮЧЕНИЕ CONNECT ВОЗВЩАЕТ ПРОМИС .then ЕСЛИ ВСЁ ОК и .catch - ОШИБКА
mongoose.connect(keys.mongoURI)
    .then(function () {
        console.log('mongo db connected');
    })
    .catch(function (error) {
        console.log(`error mongo db connect ${error}`);
    });

// ДЛЯ ПОДКЛЮЧЕНИЯ МОДУЛЯ КОТОРЫЙ ДАЁТ ВОЗМОЖНОСТЬ ОТВЕЧАТЬ НА ЗАПРОСЫ ДРУГИХ ДОМЕНОВ
const cors = require('cors');

// ДЛЯ ПОДКЛЮЧЕНИЯ МОДУЛЯ КОТОРЫЙ ДЕЛАЕТ ЛОГИРОВАНИЕ ЗАПРОСОВ
const morgan = require('morgan');

// ДЛЯ ПОДКЛЮЧЕНИЯ ФАЙЛОВ С РОУТАМИ
const analyticsRoutes = require('./routes/analytics');
const authorRoutes = require('./routes/author');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');

// ДЛЯ СОЗДАНИЯ ПРОЕКТА НА ОСНОВЕ ФРЕЙМВОРКА ЕКСПРЕСС
var app = express();

// ДЛЯ ПОДКЛЮЧЕНИЯ МОДУЛЯ КОТОРЫЙ ДЕЛАЕТ ЛОГИРОВАНИЕ ЗАПРОСОВ В РЕЖИМЕ РАЗРАБОТКИ
app.use(morgan('dev'));

// =================================================
// ++++ ЗАЩИТА ОТ ОПРЕДЕЛЁННЫХ СИМВОЛОВ В URL СТРОКЕ
// =================================================

// ДЛЯ ИСПОЛЬЗОВАНИЯ МОДУЛЯ ПОЛУЧЕНИЯ ДАННЫХ ОТПРАВЛЕННЫХ ПОЛЬЗОВАТЕЛЕМ
app.use(bodyParser.urlencoded({
    extended: true
}));

// ДЛЯ РАЗБОРА ОТПРАВЛЕННЫХ ДАННЫХ В JSON ФОРМАТЕ
app.use(bodyParser.json());

// =================================================
// ++++ ЗАЩИТА ОТ ОПРЕДЕЛЁННЫХ СИМВОЛОВ В URL СТРОКЕ
// =================================================

// ДЛЯ ПОДКЛЮЧЕНИЯ МОДУЛЯ КОТОРЫЙ ДАЁТ ВОЗМОЖНОСТЬ ОТВЕЧАТЬ НА ЗАПРОСЫ ДРУГИХ ДОМЕНОВ
app.use(cors());

// ДЛЯ ИСПОЛЬЗОВАНИЯ РОУТОВ
app.use('/api/analytics', analyticsRoutes);
app.use('/api/author', authorRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/position', positionRoutes);



// ДЛЯ ЭКСПОРТА ПРИЛОЖЕНИЯ В INDEX.JS
module.exports = app;