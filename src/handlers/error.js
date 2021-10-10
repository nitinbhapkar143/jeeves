 module.exports = (err, req, res, next) => {
    return res.status(500).json({
        code: 500,
        status: false,
        msg: 'Something went wrong. Please try again.',
    });
 }