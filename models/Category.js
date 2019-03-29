// ДЛЯ ПОДКЛЮЧЕНИЯ ПАКЕТА КОТОРЫЙ РАБОТАЕТ С БД МОНГО
const mongoose = require('mongoose');
// ДЛЯ ИСПОЛЬЗОВАНИЯ СХЕМЫ МОДУЛЯ МОНГУС ДЛЯ ПОСТРОЕНИЯ ДОКУМЕНТА
const Schema = mongoose.Schema;

// ДЛЯ СОЗДАНИЯ НОВОЙ КОНФИГУРАЦИИ СХЕМЫ ДЛЯ МОДЕЛИ КАТЕГОРИИ
const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        default: 'default.jpg'
    },
    user: {
        ref: 'users',
        type: Schema.Types.objectId
    }
});

// ДЛЯ СОЗДАНИЯ ДОКУМЕНТА В МОНГО ДБ И ПЕРЕДАЧЕ ЕЙ СХЕМЫ
module.exports = mongoose.model('categories', categorySchema);