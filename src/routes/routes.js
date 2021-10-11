const express = require('express');
const router = express.Router();
const authentication = require("../middleware/authentication")

router.use('/auth', require('./auth'));
router.use('/topic', authentication.authenticate(), require('./topics'));
router.use('/topic', authentication.authenticate(), require('./posts'));
router.use('/topic/post', authentication.authenticate(), require('./comments'));

module.exports = router;