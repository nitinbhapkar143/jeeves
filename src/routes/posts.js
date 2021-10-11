const express = require('express');
const router = express.Router();
const validator = require("../middleware/validator")
const postService = require("../services/posts");

/**
 * @api {post} /api/posts/topic Create Topic
 * @apiVersion 0.0.1
 * @apiName createTopic
 * @apiGroup Posts
 * @apiDescription Create Topic.
 * 
 * @apiParam {String} name                                Mandatory topic name.
 *
 * 
 * @apiSuccess {Number} status                             Status of the api.
 * @apiSuccess {Object} topic                              Topic created.
 * @apiSuccess {String} message                            Message of the api.
 * 
 */

router.post('/topic', validator.validateTopic(), async (req, res, next) => {
  try{
    const topic = await postService.createTopic(req.body);
    return res.status(200).json(topic)
  }catch(err){
    next(err, req, res, next);
    throw err
  }
});

module.exports = router;
