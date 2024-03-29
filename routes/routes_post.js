// ДЛЯ ПОДКЛЮЧЕНИЯ ФРЕЙМВОРКА
const express = require('express');

// ДЛЯ ПОДКЛЮЧЕНИЯ КОНТРОЛЛЕРА ПОСТОВ
const {
    getPosts,
    createPost,
    postsByUser,
    postById,
    isPoster,
    updatePost,
    deletePost } = require('../controllers/controllers_post');

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
    "/posts",
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
    postsByUser
);

router.put(
    "/post/:postId",
    requireSignin,
    isPoster,
    updatePost
);

router.delete(
    "/post/:postId",
    requireSignin,
    isPoster,
    deletePost
);




// any rout containing :userId, our app will first execute userById()
router.param("userId", userById);

// any rout containing :postId, our app will first execute userById()
router.param("postId", postById);


// ДЛЯ ЭКСПОРТА ОБРАБОТАННОГО ОБЬЕКТА РОУТЕР
module.exports = router;