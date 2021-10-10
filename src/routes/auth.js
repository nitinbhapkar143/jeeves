const express = require('express');
const router = express.Router();

router.post('/signup', async (req, res, next) => {
  try{    
  }catch(err){
    next(err, req, res, next);
    throw err
  }
});


module.exports = router;
