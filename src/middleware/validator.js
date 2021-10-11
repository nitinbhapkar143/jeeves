const joi = require('joi');

const signup = joi.object({
    email: joi.string().email({ tlds: { allow: false } }).required(),
    password: joi.string().min(8).max(20).required()
});

const topic = joi.object({
    name: joi.string().min(2).max(50).required()
});

const post = joi.object({
    text: joi.string().min(2).max(50).required()
});

exports.validateSignup = () => (req, res, next) => {
    const { error } = signup.validate(req.body);
    if(!error) return next();
    return res.status(400).json({
        status: false,
        msg: error.details[0].message,
    });
};

exports.validateTopic = () => (req, res, next) => {
    const { error } = topic.validate(req.body);
    if(!error) return next();
    return res.status(400).json({
        status: false,
        msg: error.details[0].message,
    });
};

exports.validatePost = () => (req, res, next) => {
    const { error } = post.validate(req.body);
    if(!error) return next();
    return res.status(400).json({
        status: false,
        msg: error.details[0].message,
    });
};