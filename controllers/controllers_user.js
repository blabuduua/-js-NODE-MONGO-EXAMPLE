const _ = require('lodash');
const User = require('../models/models_user');

exports.userById = (req, res, next, id) => {

    User.findById(id).exec((err, user) => {

        if(err || !user){
            return res.status(400).json({
                error: "User not found!"
            });
        }

        req.profile = user;

        next();
    });
};

exports.hasAuthorization = (req, res, next) => {

    const authorized = req.profile && req.auth && req.profile._id === req.auth._id;

    if(!authorized){
        return res.status(403).json({
           error: 'User is not authorized to perform this action!'
        });
    }
};

// ДЛЯ ЭКСПОРТА ФУНКЦИИ ВОЗВРАТА ВСЕХ ПОЛЬЗОВАТЕЛЕЙ
exports.allUsers = (req, res) => {

    User.find((err, users) => {

        if(err){
            return res.status(400).json({
               error: err
            });
        }

        res.json({ users });
    }).select('name email');
};

exports.getUser = (req, res) => {

    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;

    return res.json(req.profile);
};

exports.updateUser = (req, res, next) => {

    let user = req.profile;

    user = _.extend(user, req.body); // extend - mutate the source object

    user.updated = Date.now();

    user.save((err) => {

        if(err){
            return res.status(400).json({
                error: "You are not authorized to perform this action!"
            });
        }

        user.hashed_password = undefined;
        user.salt = undefined;

        res.json({ user });
    });
};

exports.deleteUser = (req, res, next) => {

    let user = req.profile;

    user.remove((err, user) => {
        if(err){
            return res.status(400).json({
               error: err
            });
        }

        user.hashed_password = undefined;
        user.salt = undefined;

        res.json({
            message: "User deleted successfully!"
        });
    });
};