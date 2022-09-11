const { validationResult } = require("express-validator");

const validationMiddleware = (req, res = response, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({ msg: 'Error', errors: errors.mapped() })
    }
    next();
}

module.exports = validationMiddleware;