const express = require('express');
const controller = require('../controllers/author');
const router = express.Router();


//localhost:8080/api/author/login
router.post('/login', controller.login);

//localhost:8080/api/author/register
router.post('/register', controller.register);



module.exports = router;