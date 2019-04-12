const express = require('express');

// ДЛЯ ПОДКЛЮЧЕНИЯ МОДУЛЯ-ПОМОЩНИКА АВТОРИЗАЦИИ
const passport = require('passport');

// ДЛЯ ВЫБОРА КОНТРОЛЛЕРА ДЛЯ РОУТА
const controller = require('../controllers/order');
const router = express.Router();

// ДЛЯ УКАЗАНИЯ КАКИЕ РОУТЫ ЕСТЬ И ФУНКЦИИ КОТОРЫЕ РЕАЛИЗОВАНЫ В КОНТРОЛЛЕРЕ
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);

router.post('/', passport.authenticate('jwt', {session: false}), controller.createOne);


module.exports = router;