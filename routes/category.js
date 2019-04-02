const express = require('express');
const passport = require('passport');
const controller = require('../controllers/category');
const upload = require('../middleware/upload');
const router = express.Router();


router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);

router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById);

router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.removeById);

router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.createOne);

router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.updateById);


module.exports = router;