const express = require('express');
const router = express.Router();



router.get('/login', function(req, res){
    res.status(200).json({
        login: true
    });
});



module.exports = router;