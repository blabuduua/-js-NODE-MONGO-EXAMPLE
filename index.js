// ДЛЯ ПОДКЛЮЧЕНИЯ ПРИЛОЖЕНИЯ
const app = require('./app');

// ДЛЯ ИСПОЛЬЗОВАНИЯ ПОРТА ИЗ НАСТРОЕК ИЛИ 8080 ПО УМОЛЧАНИЮ
const port = process.env.PORT || 8080;


// ДЛЯ ЗАПУСКА ПРИЛОЖЕНИЯ
app.listen(port, function () {
    console.log(`Server Started! on ${port}`);
});