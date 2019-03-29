const express = require('express');
const controller = require('../controllers/order');
const router = express.Router();


router.get('/', controller.getAll);

router.post('/', controller.createOne);


module.exports = router;