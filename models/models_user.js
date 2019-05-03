const mongoose = require('mongoose');

// ДЛЯ ГЕНЕРАЦИИ СЛУЧАЙНЫХ ЧИСЕЛ
const uuidv1 = require('uuid/v1');

// ДЛЯ ШИФРОВАНИЯ
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});

// virtual field
userSchema.virtual('password')
    .set(function (password) {
        // create temporary variable called _password
        this._password = password;

        // generate a timestamp
        this.salt = uuidv1();

        // encryptPassword
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });


// methods
userSchema.methods = {
    encryptPassword: function(password){
        if(!password) return '';

        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');

        } catch (err) {
            return '';
        }
    }
};


module.exports = mongoose.model('User', userSchema);