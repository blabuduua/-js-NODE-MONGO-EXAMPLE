const Post = require('../models/models_post');

// ДЛЯ ЭКСПОРТА ФУНКЦИИ ВОЗВРАТА ВСЕХ ПОСТОВ
exports.getPosts = (req, res) => {
    res.json({
        Posts: [
            {FirstPost: 'FirstPost', Title: 'Title'},
            {SecondPost: 'SecondPost', Title: 'Title'}
        ]
    })
};

// ДЛЯ ЭКСПОРТА ФУНКЦИИ СОЗДАНИЯ ПОСТА
exports.createPost = (req, res) => {
    const post = new Post(req.body);

    post.save().then(result => {
            res.status(200).json({
                post: result
            });
        });
};