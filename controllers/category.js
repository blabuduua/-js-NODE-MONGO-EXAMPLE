const Category = require('../models/Category');
const Position = require('../models/Position');
const errorsHandler = require('../utils/errorsHandler');

module.exports.getAll = async function (req, res) {
    try {
        const categories = await Category.find({
            user: req.user.id
        });

        res.status(200).json(categories);
    }catch (e) {
        errorsHandler(res, e);
    }
};

module.exports.getById = async function (req, res) {
    try {
        const category = await Category.findById(req.params.id);

        res.status(200).json(category);
    }catch (e) {
        errorsHandler(res, e);
    }
};

module.exports.removeById = async function (req, res) {
    try {
        await Category.remove({
            _id: req.params.id
        });

        await Position.remove({
            category: req.params.id
        });

        res.status(200).json({
            message: 'Категория успешно удалена!'
        });
    }catch (e) {
        errorsHandler(res, e);
    }
};

module.exports.createOne = async function (req, res) {
    const сategory = new Category({
        name: req.body.name,
        imageSrc: req.file ? req.file.path : '',
        user: req.user.id
    });

    try {
        await сategory.save();

        res.status(201).json(сategory);
    }catch (e) {
        errorsHandler(res, e);
    }
};

module.exports.updateById = async function (req, res) {
    const updated = {
        name: req.body.name
    };

    if(req.file){
        updated.imageSrc = req.file.path;
    }

    try {
        const category = await Category.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );

        res.status(200).json(category);
    }catch (e) {
        errorsHandler(res, e);
    }
};