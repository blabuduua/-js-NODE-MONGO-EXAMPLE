const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const errorsHandler = require('../utils/errorsHandler');

module.exports.login = async function (req, res) {
    // ДЛЯ ПОИСКА ЕМАИЛА В БД (ОСТАЛЬНОЙ КОД ЖДЁТ ЗАВЕРШЕНИЯ СВЯЗИ С БД)
    const candidate = await User.findOne({
        email: req.body.email
    });

    if(candidate){
        // ДЛЯ СРАВНЕНИЯ ПАРОЛЯ В БАЗЕ С ЗАШИФРОВАННЫМ ПРИЛЕТЕВШИМ
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);

        if(passwordResult){
            // ДЛЯ ГЕНЕРАЦИИ ТОКЕНА И АВТОРИЗАЦИИ
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {
                expiresIn: 60 * 60
            });

            // ДЛЯ ОТПРАВКИ ПОЛЬЗОВАТЕЛЮ СООБЩЕНИЯ ОБ УСПЕХЕ
            res.status(200).json({
                token: `Bearer ${token}`,
                message: 'Вы успешно авторизировались!'
            });
        }else{
            // ДЛЯ ОТПРАВКИ ПОЛЬЗОВАТЕЛЮ СООБЩЕНИЯ ОБ ОШИБКЕ
            res.status(401).json({
                message: 'E-mail или пароль не действительны!'
            });
        }
    }else{
        // ДЛЯ ОТПРАВКИ ПОЛЬЗОВАТЕЛЮ СООБЩЕНИЯ ОБ ОШИБКЕ
        res.status(404).json({
            message: 'E-mail или пароль не действительны!'
        });
    }
};

// ДЛЯ ИСПОЛЬЗОВАНИЯ АСИНХРОННОГО РЕЖИМА РЕГИСТРАЦИИ
module.exports.register = async function (req, res) {
    // ДЛЯ ПОИСКА ЕМАИЛА В БД (ОСТАЛЬНОЙ КОД ЖДЁТ ЗАВЕРШЕНИЯ СВЯЗИ С БД)
    const candidate = await User.findOne({
        email: req.body.email
    });

    // ДЛЯ ПРОВЕРКИ ЕСТЬ ЛИ ПОЛЬЗОВАТЕЛЬ В БД
    if(candidate){
        // ДЛЯ ОТПРАВКИ ПОЛЬЗОВАТЕЛЮ СООБЩЕНИЯ ОБ ОШИБКЕ
        res.status(409).json({
            message: 'Такой E-mail уже зарегистрирован!'
        });
    }else{
        // ДЛЯ ШИФРОВАНИЯ ПАРОЛЯ
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;

        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });

        // ДЛЯ ПОПЫТКИ СОХРАНИТЬ ПОЛЬЗОВАТЕЛЯ
        try {
            // ДЛЯ ВЫПОЛНЕНИЯ АСИНХРОННО
            await user.save();

            res.status(201).json({
                message: 'Пользователь успешно зарегистрирован!',
                email: user.email,
                password: user.password
            });
        }catch (e) {
            errorsHandler(res, e);
        }
    }
};