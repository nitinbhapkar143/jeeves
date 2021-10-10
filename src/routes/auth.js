const express = require('express');
const router = express.Router();
const validator = require("../middleware/validator")

router.post('/records', validator.validateSignup(), async (req, res, next) => {
  try{    
  }catch(err){
    next(err, req, res, next);
    throw err
  }
});


module.exports = router;
