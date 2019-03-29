// ДЛЯ ПОДКЛЮЧЕНИЯ ПАКЕТА КОТОРЫЙ РАБОТАЕТ С БД МОНГО
const mongoose = require('mongoose');
// ДЛЯ ИСПОЛЬЗОВАНИЯ СХЕМЫ МОДУЛЯ МОНГУС ДЛЯ ПОСТРОЕНИЯ ДОКУМЕНТА
const Schema = mongoose.Schema;

// ДЛЯ СОЗДАНИЯ НОВОЙ КОНФИГУРАЦИИ СХЕМЫ ДЛЯ МОДЕЛИ ПОЗИЦИИ
const orderSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    order: {
        type: Number,
        required: true
    },
    list: [
        {
            name: {
                type: String
            },
            quantity: {
                type: Number
            },
            cost: {
                type: Number
            }
        }
    ],
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
});

// ДЛЯ СОЗДАНИЯ ДОКУМЕНТА В МОНГО ДБ И ПЕРЕДАЧЕ ЕЙ СХЕМЫ
module.exports = mongoose.model('orders', orderSchema);