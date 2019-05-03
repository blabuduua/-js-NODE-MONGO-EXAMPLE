const User = require('../models/models_user');


// ДЛЯ ЭКСПОРТА ФУНКЦИИ ВОЗВРАТА ВСЕХ ПОЛЬЗОВАТЕЛЕЙ
exports.getUsers = (req, res) => {
    const user = User.find()
        .select("_id name email password")
        .then((users) => {
            res.json({
                users
            });
        })
        .catch(err => console.log(err));
};

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