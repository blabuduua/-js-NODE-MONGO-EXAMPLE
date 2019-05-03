// ДЛЯ ПОДКЛЮЧЕНИЯ ФРЕЙМВОРКА
const express = require('express');

// ДЛЯ ПОДКЛЮЧЕНИЯ КОНТРОЛЛЕРА
const { getPosts, createPost } = require('../controllers/controllers_post');

// ДЛЯ ПОДКЛЮЧЕНИЯ ФУНКЦИИ ДЛЯ ПРОВЕРКИ АВТОРИЗИРОВАННОСТИ ПОЛЬЗОВАТЕЛЯ
const { requireSignin } = require('../controllers/controllers_auth');

// ДЛЯ ПОДКЛЮЧЕНИЯ ВАЛИДАТОРА ФОРМЫ ПОСТА
const { createPostValidator } = require('../validators/validators_post');

// ДЛЯ ИСПОЛЬЗОВАНИЯ РОУТЕРА ЕКСПРЕСС
const router = express.Router();


// ДЛЯ НАЗНАЧЕНИЯ КОНТРОЛЛЕРА И ФУНКЦИИ РОУТУ
router.get('/', requireSignin, getPosts);
router.post('/post', requireSignin, createPostValidator, createPost);


// ДЛЯ ЭКСПОРТА ОБРАБОТАННОГО ОБЬЕКТА РОУТЕР
module.exports = router;