exports.createPostValidator = (req, res, next) => {

    // Title
    req.check('title', 'Please write a title').notEmpty();
    req.check('title', 'Title must be between 4 to 150 characters').isLength({
        min: 4,
        max: 150
    });

    // Body
    req.check('body', 'Please write a body').notEmpty();
    req.check('body', 'Body must be between 4 to 2000 characters').isLength({
        min: 4,
        max: 2000
    });

    // Check fot Errors
    const errors = req.validationErrors();

    // if error show the first one as they happe
    if(errors){
        const firstError = errors.map((error) => error.msg)[0];


        return res.status(400).json({
            error: firstError
        });
    }

    // Proceed to next middleware
    next();
};