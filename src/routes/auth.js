const express = require('express');
const router = express.Router();
const validator = require("../middleware/validator")

/**
 * @api {post} /api/auth/signup Signup
 * @apiVersion 0.0.1
 * @apiName Signup
 * @apiGroup Auth
 * @apiDescription Signup.
 * 
 */

router.post('/records', validator.validateSignup(), async (req, res, next) => {
  try{    
  }catch(err){
    next(err, req, res, next);
    throw err
  }
});


module.exports = router;
