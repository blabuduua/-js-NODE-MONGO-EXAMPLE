const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// ДЛЯ ПОДКЛЮЧЕНИЯ МОДЕЛИ ПОЛЬЗОВАТЕЛЯ
const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('users');

const keys = require('../config/keys');

// НАСТРОЙКИ ПАСПОРТА
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
};

module.exports = function (passport) {
    passport.use(
        new JwtStrategy(options, async function (payload, done) {
            try {
                const user = await User.findById(payload.userId).select('email id');

                if(user){
                    done(null, user);
                }else{
                    done(null, false);
                }
            }catch (e) {
                console.log(e);
            }
        })
    );
};