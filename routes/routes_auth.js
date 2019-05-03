// ДЛЯ ПОДКЛЮЧЕНИЯ ФРЕЙМВОРКА
const express = require('express');

// ДЛЯ ПОДКЛЮЧЕНИЯ КОНТРОЛЛЕРА
const { getUsers, signup, signin, signout, requireSignin } = require('../controllers/controllers_auth');

// ДЛЯ ПОДКЛЮЧЕНИЯ ВАЛИДАТОРА ФОРМЫ ПОСТА
const { createUserValidator, createUserAuthValidator } = require('../validators/validators_user');

// ДЛЯ ИСПОЛЬЗОВАНИЯ РОУТЕРА ЕКСПРЕСС
const router = express.Router();

// ДЛЯ НАЗНАЧЕНИЯ КОНТРОЛЛЕРА И ФУНКЦИИ РОУТУ

// works routes
router.get('/users', requireSignin, getUsers);

// auth
router.post('/signup', createUserValidator, signup);
router.post('/signin', createUserAuthValidator, signin);

// signout
router.get('/signout', requireSignin, signout);


// ДЛЯ ЭКСПОРТА ОБРАБОТАННОГО ОБЬЕКТА РОУТЕР
module.exports = router;