const express = require('express');

// ДЛЯ ПОДКЛЮЧЕНИЯ МОДУЛЯ-ПОМОЩНИКА АВТОРИЗАЦИИ
const passport = require('passport');

const controller = require('../controllers/position');
const router = express.Router();

router.get('/:categoryId', passport.authenticate('jwt', {session: false}), controller.getByCategoryId);

router.post('/', passport.authenticate('jwt', {session: false}), controller.createOne);

router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.updateById);

router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.removeById);



module.exports = router;