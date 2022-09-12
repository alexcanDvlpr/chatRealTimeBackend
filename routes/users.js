const { Router } = require('express');
const { findUsers } = require('../controllers/user');
const { validateJwt } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJwt, findUsers);


module.exports = router;