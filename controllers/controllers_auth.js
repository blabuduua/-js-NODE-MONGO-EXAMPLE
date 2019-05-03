const jwt = require('jsonwebtoken');

// ДЛЯ ПОДКЛЮЧЕНИЯ ФАЙЛА НАСТРОЕК
require('dotenv').config();

// ДЛЯ ПОДКЛЮЧЕНИЯ ВАЛИДАТОРА JWT ТОКЕНА
const expressJwt = require('express-jwt');

const User = require('../models/models_user');


// ДЛЯ РЕГИСТРАЦИИ ПОЛЬЗОВАТЕЛЯ
exports.signup = async (req, res) => {

    // ДЛЯ ПОИСКА ЕМАИЛА В БД
    const userExists = await User.findOne({ email: req.body.email });

    // ДЛЯ ОТПРАВЛЕНИЯ ОШИБКИ О ТОМ ЧТО ПОЛЬЗОВАТЕЛЬ ЕСТЬ
    if(userExists) return res.status(403).json({
       error: "Email is taken"
    });

    // ДЛЯ СОЗДАНИЕ НОВОГО ПОЛЬЗОВАТЕЛЯ
    const user = await new User(req.body);

    // ДЛЯ СОХРАНЕНИЯ ОБЬЕКТА ПОЛЬЗОВАТЕЛЯ В БД
    await user.save();

    // ДЛЯ ОТПРАВКИ ОТВЕТА С ОБЬЕКТОМ ЮЗЕРА И СТАТУСОМ ОК
    res.status(200).json({ message: 'Signup success! Please login.' });
};

// ДЛЯ АВТОРИЗАЦИИ ПОЛЬЗОВАТЕЛЯ
exports.signin = async (req, res) => {

    // find the user based on email
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {

        // if err or no user
        if(err || !user){

            return res.status(401).json({
               error: 'User with this email does not exist. Please singup!'
            });
        }

        // if user is found, make sure the email and password match
        // create authenticate method in model and use here
        if(!user.authenticate(password)){

            return res.status(401).json({
                error: 'Email and password do not match'
            });
        }

        // generate a token with user ans secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        // persist the token as 't' in cookie with expiry date
        res.cookie("t", token, { expire: new Date() + 9999 });

        // return response with user and token to frontend client
        const { _id, name, email } = user;


        return res.json({ token, user: { _id, name, email } });
    });
};

// ДЛЯ  ВЫХОДА ПОЛЬЗОВАТЕЛЯ
exports.signout = (req, res) => {
    res.clearCookie('t');

    return res.json({ message: 'Singout success!' });
};

// ДЛЯ ПРОВЕРКИ АВТОРИЗАЦИИ
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET
});