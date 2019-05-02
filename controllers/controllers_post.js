const Post = require('../models/models_post');

// ДЛЯ ЭКСПОРТА ФУНКЦИИ ВОЗВРАТА ВСЕХ ПОСТОВ
exports.getPosts = (req, res) => {
    const post = Post.find()
        .select("_id title body")
        .then((posts) => {
            res.json({
                posts
            });
        })
        .catch(err => console.log(err));
};

// ДЛЯ ЭКСПОРТА ФУНКЦИИ СОЗДАНИЯ ПОСТА
exports.createPost = (req, res) => {
    const post = new Post(req.body);

    post.save().then(result => {
            res.json({
                post: result
            });
        });
};