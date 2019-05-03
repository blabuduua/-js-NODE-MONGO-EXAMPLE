// ДЛЯ ПОДКЛЮЧЕНИЯ ФРЕЙМВОРКА
const express = require('express');

// ДЛЯ ПОДКЛЮЧЕНИЯ КОНТРОЛЛЕРА
const { getUsers, signup, signin, signout, requireSignin } = require('../controllers/controllers_auth');

// ДЛЯ ПОИСКА ВО ВСЕХ УРЛ :userId, чтобы подсунуть в запрос обьект авторизированного юзера
const { userById } = require('../controllers/controllers_user');

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

// any rout containing :userId, our app will first execute userBiId()
router.param('userId', userById);


// ДЛЯ ЭКСПОРТА ОБРАБОТАННОГО ОБЬЕКТА РОУТЕР
module.exports = router;