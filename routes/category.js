const express = require('express');
const controller = require('../controllers/category');
const router = express.Router();


router.get('/', controller.getAll);

router.get('/:id', controller.getById);

router.delete('/:id', controller.removeById);

router.post('/', controller.createOne);

router.patch('/:id', controller.updateById);


module.exports = router;