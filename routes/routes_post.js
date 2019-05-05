// ДЛЯ ПОДКЛЮЧЕНИЯ ФРЕЙМВОРКА
const express = require('express');

// ДЛЯ ПОДКЛЮЧЕНИЯ КОНТРОЛЛЕРА ПОСТОВ
const {
    getPosts,
    createPost,
    postsByUser } = require('../controllers/controllers_post');

// ДЛЯ ПОДКЛЮЧЕНИЯ ФУНКЦИИ ДЛЯ ПРОВЕРКИ АВТОРИЗИРОВАННОСТИ ПОЛЬЗОВАТЕЛЯ
const { requireSignin } = require('../controllers/controllers_auth');

// ДЛЯ ПОИСКА ВО ВСЕХ УРЛ :userId, чтобы подсунуть в запрос обьект авторизированного юзера
const { userById } = require('../controllers/controllers_user');

// ДЛЯ ПОДКЛЮЧЕНИЯ ВАЛИДАТОРА ФОРМЫ ПОСТА
const { createPostValidator } = require('../validators/validators_post');

// ДЛЯ ИСПОЛЬЗОВАНИЯ РОУТЕРА ЕКСПРЕСС
const router = express.Router();


// ДЛЯ НАЗНАЧЕНИЯ КОНТРОЛЛЕРА И ФУНКЦИИ РОУТУ
router.get(
    "/",
    requireSignin,
    getPosts
);

router.post(
    "/post/new/:userId",
    requireSignin,
    createPost,
    createPostValidator
);

router.get(
    "/posts/by/:userId",
    requireSignin,
    postsByUser
);


// any rout containing :userId, our app will first execute userBiId()
router.param("userId", userById);


// ДЛЯ ЭКСПОРТА ОБРАБОТАННОГО ОБЬЕКТА РОУТЕР
module.exports = router;