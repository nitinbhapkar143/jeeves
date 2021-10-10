const joi = require('joi');

const signupObject = joi.object({
    email: joi.string().email({ tlds: { allow: false } }).required(),
    password: joi.string().min(8).max(20).required()
});

exports.validateSignup = () => (req, res, next) => {
    const { error } = signupObject.validate(req.body);
    if(!error) return next();
    return res.status(400).json({
        status: false,
        msg: error.details[0].message,
    });
  
};