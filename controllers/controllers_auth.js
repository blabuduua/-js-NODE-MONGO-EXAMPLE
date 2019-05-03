const User = require('../models/models_user');

// ДЛЯ АВТОРИЗАЦИИ ПОЛЬЗОВАТЕЛЯ
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