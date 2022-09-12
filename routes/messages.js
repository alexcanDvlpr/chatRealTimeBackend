const { Router } = require('express');
const { findMessageFrom } = require('../controllers/messages');
const { validateJwt } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/:from', validateJwt, findMessageFrom);

module.exports = router;