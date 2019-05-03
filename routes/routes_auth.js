// ДЛЯ ПОДКЛЮЧЕНИЯ ФРЕЙМВОРКА
const express = require('express');

// ДЛЯ ПОДКЛЮЧЕНИЯ КОНТРОЛЛЕРА
const { getUsers, signup } = require('../controllers/controllers_auth');

// ДЛЯ ПОДКЛЮЧЕНИЯ ВАЛИДАТОРА ФОРМЫ ПОСТА
const { createUserValidator } = require('../validators/validators_user');

// ДЛЯ ИСПОЛЬЗОВАНИЯ РОУТЕРА ЕКСПРЕСС
const router = express.Router();

// ДЛЯ НАЗНАЧЕНИЯ КОНТРОЛЛЕРА И ФУНКЦИИ РОУТУ
router.get('/users', getUsers);
router.post('/signup', createUserValidator, signup);


// ДЛЯ ЭКСПОРТА ОБРАБОТАННОГО ОБЬЕКТА РОУТЕР
module.exports = router;