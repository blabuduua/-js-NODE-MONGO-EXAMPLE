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

    // console.log("Post created", req.body);

    post.save((err, result) => {
        if(err) {
            return res.status(400).json({
               error: err
            });
        }

        res.status(200).json({
           post: result
        });
    });
};