const express = require('express');

// ДЛЯ ПОДКЛЮЧЕНИЯ МОДУЛЯ-ПОМОЩНИКА АВТОРИЗАЦИИ
const passport = require('passport');

// ДЛЯ УКАЗАНИЯ ФАЙЛА КОНТРОЛЛЕРА ДЛЯ РОУТОВ
const controller = require('../controllers/category');

// ДЛЯ ПОДКЛЮЧЕНИЯ ПОСРЕДНИКА ДЛЯ ЗАГРУЗКИ ФОТО (ВАЛИДАЦИЯ / СОХРАНЕНИЕ)
const upload = require('../middleware/upload');
const router = express.Router();

// НАБОР РОУТОВ С ПОСРЕДНИКАМИ АВТОРИЗАЦИИ И ЗАГРУЗКИ ФАЙЛОВ
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);

router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById);

router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.removeById);

router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.createOne);

router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.updateById);


module.exports = router;