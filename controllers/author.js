const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports.login = function (req, res) {
    res.status(200).json({
       login: {
            email: req.body.email,
            password: req.body.password
       }
    });
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
            login: 'Такой E-mail уже зарегистрирован!'
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
            // ДЛЯ ОБРАБОТКИ ОШИБКИ
        }
    }
};