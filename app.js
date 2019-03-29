const express = require('express');
const authRoutes = require('./routes/author');
var app = express();



app.use('/api/author', authRoutes);




module.exports = app;