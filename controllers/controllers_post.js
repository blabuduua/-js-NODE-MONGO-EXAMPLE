const Post = require('../models/models_post');
const formidable = require('formidable');
const fs = require('fs');

// ДЛЯ ВОЗВРАТА ПОСТА ПО ID
exports.postById = (req, res, next, id) => {
    Post.findById(id)
        .populate("postedBy", "_id name email")
        .exec((err, post) => {

            if(err || !post){

                return res.status(400).json({
                    error: err
                });
            }

            req.post = post;
            next();
        });
};

// ДЛЯ ЭКСПОРТА ФУНКЦИИ ВОЗВРАТА ВСЕХ ПОСТОВ
exports.getPosts = (req, res) => {
    const post = Post.find()
        .populate("postedBy", "_id name email")
        .select("_id title body")
        .then((posts) => {
            res.json({
                posts
            });
        })
        .catch(err => console.log(err));
};

// ДЛЯ ЭКСПОРТА ФУНКЦИИ СОЗДАНИЯ ПОСТА
exports.createPost = (req, res, next) => {

    // ДЛЯ ОБРАБОТКИ ИЗОБРАЖЕНИЯ В ФОРМЕ
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {

        if(err){
            return res.status(400).json({
               error: "Image could not be uploaded"
            });
        }

        // ДЛЯ СОЗДАНИЯ ЗАПИСИ И ПРИВЯЗКИ АВТОРА
        let post = new Post(fields);

        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;

        post.postedBy = req.profile;

        // ДЛЯ ПРОВЕРКИ ЕСТЬ ЛИ ФАЙЛИ С ИМЕНЕМ ФОТО
        if(files.photo){
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }

        post.save((err, result) => {

            if(err){
                return res.status(400).json({
                    error: err
                });
            }

            res.json(result);
        });
    });
};

// ДЛЯ ВОЗВРАТА ПОСТОВ СОЗДАННЫХ ЭТИМ ЮЗЕРОМ
exports.postsByUser = (req, res) => {

    Post.find({ postedBy: req.profile._id })
        .populate("postedBy", "_id name email")
        .sort("_created")
        .exec((err, posts) => {

            if(err){
                return res.status(400).json({
                    error: err
                });
            }

            res.json(posts);
        });


};

// ДЛЯ ПРОВЕРКИ ЯВЛЯЕТСЯ ЛИ ЧЕЛОВЕК АВТОРОМ ПОСТА
exports.isPoster = (req, res, next) => {

    console.log("req.post", req.post);
    console.log("req.auth", req.auth);
    console.log("req.post.postedBy._id", req.post.postedBy._id);
    console.log("req.auth._id", req.auth._id);

    let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;


    if(!isPoster){

        return res.status(403).json({
            error: "User is not author!"
        });
    }

    next();
};

exports.deletePost = (req, res) => {

    let post = req.post;

    post.remove((err, post) => {

        if(err){

            return res.status(400).json({
                error: err
            });
        }

        res.status(200).json({
            message: "Post deleted successfully!"
        });
    });
};