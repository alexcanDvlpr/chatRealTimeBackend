const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, signIn, renew } = require('../controllers/auth');
const { validateJwt } = require('../middlewares/validate-jwt');
const validationMiddleware = require('../middlewares/validation');

const router = Router();

router.post('/new', [
    check('name', 'Name is mandatory field').not().isEmpty(),
    check('email', 'Email is mandatory field').not().isEmpty(),
    check('email', 'Email field has bad format').isEmail(),
    check('password', 'Password is a mandatory field').not().isEmpty(),
    validationMiddleware
], createUser);

router.post('/', [
    check('email', 'Email is mandatory field').not().isEmpty(),
    check('email', 'Email field has bad format').isEmail(),
    check('password', 'Password is a mandatory field').not().isEmpty(),
    validationMiddleware
], signIn);

router.get('/renew', [
    validateJwt
],
    renew);

module.exports = router;