// ДЛЯ ПОДКЛЮЧЕНИЯ ФРЕЙМВОРКА
const express = require('express');

// ДЛЯ ПОДКЛЮЧЕНИЯ КОНТРОЛЛЕРА
const { requireSignin } = require('../controllers/controllers_auth');

// ДЛЯ ПОИСКА ВО ВСЕХ УРЛ :userId, чтобы подсунуть в запрос обьект авторизированного юзера
const { userById, allUsers, getUser } = require('../controllers/controllers_user');

// ДЛЯ ИСПОЛЬЗОВАНИЯ РОУТЕРА ЕКСПРЕСС
const router = express.Router();

// ДЛЯ НАЗНАЧЕНИЯ КОНТРОЛЛЕРА И ФУНКЦИИ РОУТУ

// works routes
router.get('/users', requireSignin, allUsers);
router.get('/user/:userId', requireSignin, getUser);

router.param('userId', userById);


// ДЛЯ ЭКСПОРТА ОБРАБОТАННОГО ОБЬЕКТА РОУТЕР
module.exports = router;