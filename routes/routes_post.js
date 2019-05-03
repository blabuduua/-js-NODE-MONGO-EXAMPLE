// ДЛЯ ПОДКЛЮЧЕНИЯ ФРЕЙМВОРКА
const express = require('express');

// ДЛЯ ПОДКЛЮЧЕНИЯ КОНТРОЛЛЕРА
const { getPosts, createPost } = require('../controllers/controllers_post');

// ДЛЯ ПОДКЛЮЧЕНИЯ ВАЛИДАТОРА ФОРМЫ ПОСТА
const { createPostValidator } = require('../validators/validators_post');

// ДЛЯ ИСПОЛЬЗОВАНИЯ РОУТЕРА ЕКСПРЕСС
const router = express.Router();


// ДЛЯ НАЗНАЧЕНИЯ КОНТРОЛЛЕРА И ФУНКЦИИ РОУТУ
router.get('/', getPosts);
router.post('/post', createPostValidator, createPost);


// ДЛЯ ЭКСПОРТА ОБРАБОТАННОГО ОБЬЕКТА РОУТЕР
module.exports = router;