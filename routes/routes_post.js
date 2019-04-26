// ДЛЯ ПОДКЛЮЧЕНИЯ ФРЕЙМВОРКА
const express = require('express');

// ДЛЯ ПОДКЛЮЧЕНИЯ КОНТРОЛЛЕРА
const controllersPost = require('../controllers/controllers_post');

// ДЛЯ ИСПОЛЬЗОВАНИЯ РОУТЕРА ЕКСПРЕСС
const router = express.Router();


// ДЛЯ НАЗНАЧЕНИЯ КОНТРОЛЛЕРА И ФУНКЦИИ РОУТУ
router.get('/', controllersPost.getPosts);


// ДЛЯ ЭКСПОРТА ОБРАБОТАННОГО ОБЬЕКТА РОУТЕР
module.exports = router;