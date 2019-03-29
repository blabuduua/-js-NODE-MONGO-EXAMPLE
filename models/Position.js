// ДЛЯ ПОДКЛЮЧЕНИЯ ПАКЕТА КОТОРЫЙ РАБОТАЕТ С БД МОНГО
const mongoose = require('mongoose');
// ДЛЯ ИСПОЛЬЗОВАНИЯ СХЕМЫ МОДУЛЯ МОНГУС ДЛЯ ПОСТРОЕНИЯ ДОКУМЕНТА
const Schema = mongoose.Schema;

// ДЛЯ СОЗДАНИЯ НОВОЙ КОНФИГУРАЦИИ СХЕМЫ ДЛЯ МОДЕЛИ ПОЗИЦИИ
const positionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    category: {
        ref: 'categories',
        type: Schema.Types.ObjectId
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
});

// ДЛЯ СОЗДАНИЯ ДОКУМЕНТА В МОНГО ДБ И ПЕРЕДАЧЕ ЕЙ СХЕМЫ
module.exports = mongoose.model('positions', positionSchema);