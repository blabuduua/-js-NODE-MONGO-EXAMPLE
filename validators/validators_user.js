exports.createUserValidator = (req, res, next) => {

    req.check('name', 'Name is required.').notEmpty();

    req.check('email', 'Email must be between 3 to 32 characters.')
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @.")
        .isLength({
            min: 3,
            max: 32
        });

    req.check('password', 'Password is required.').notEmpty();
    req.check('password')
        .isLength({
            min: 6
        })
        .withMessage('Password must contain at least 6 characters.')
        .matches(/\d/)
        .withMessage('Password must contain a number.');


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