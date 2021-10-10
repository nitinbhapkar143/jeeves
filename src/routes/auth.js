const express = require('express');
const router = express.Router();
const validator = require("../middleware/validator")
const userService = require("../services/user");

/**
 * @api {post} /api/auth/signup Signup
 * @apiVersion 0.0.1
 * @apiName Signup
 * @apiGroup Auth
 * @apiDescription Signup.
 * 
 * @apiParam {String} email                                Mandatory email.
 * @apiParam {String} password                             Mandatory password.
 *
 * 
 * @apiSuccess {Number} status                             Status of the api.
 * @apiSuccess {String} user                               User created.
 * @apiSuccess {String} message                            Message of the api.
 * 
 */

router.post('/signup',validator.validateSignup(), async (req, res, next) => {
  try{
    const user = await userService.signup(req.body);
    return res.status(200).json(user)
  }catch(err){
    next(err, req, res, next);
    throw err
  }
});

/**
 * @api {post} /api/auth/login Login
 * @apiVersion 0.0.1
 * @apiName Login
 * @apiGroup Auth
 * @apiDescription Login.
 * 
 * @apiParam {String} email                                Mandatory email.
 * @apiParam {String} password                             Mandatory password.
 *
 * 
 * @apiSuccess {Number} status                                 Status of the api.
 * @apiSuccess {String} token                                  JWT Token.
 * @apiSuccess {String} message                                Message of the api.
 * 
 */

 router.post('/login', validator.validateSignup(), async (req, res, next) => {
  try{
    const user = await userService.login(req.body);
    return res.status(200).json(user)
  }catch(err){
    next(err, req, res, next);
    throw err
  }
});

module.exports = router;
