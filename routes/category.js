const express = require('express');
const controller = require('../controllers/category');
const passport = require('passport');
const router = express.Router();


router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);

router.get('/:id', controller.getById);

router.delete('/:id', controller.removeById);

router.post('/', controller.createOne);

router.patch('/:id', controller.updateById);


module.exports = router;