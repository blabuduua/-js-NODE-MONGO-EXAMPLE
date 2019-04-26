// ДЛЯ ЭКСПОРТА ФУНКЦИИ
exports.getPosts = (req, res) => {
    res.json({
        Posts: [
            {FirstPost: 'FirstPost', Title: 'Title'},
            {SecondPost: 'SecondPost', Title: 'Title'}
        ]
    })
};