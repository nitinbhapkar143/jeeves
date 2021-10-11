const express = require('express');
const router = express.Router();
const authentication = require("../middleware/authentication")

router.use('/auth', require('./auth'));
router.use('/posts', authentication.authenticate(), require('./posts'));

module.exports = router;