const express = require('express');
const router = express.Router();
const validator = require("../middleware/validator")
const postService = require("../services/posts");


/**
 * @api {post} /api/topic/topicId/post Create Post
 * @apiVersion 0.0.1
 * @apiName createPost
 * @apiGroup Posts
 * @apiDescription Create Post.
 * 
 * @apiHeader {String} authorization                      Users unique token.
 * 
 * @apiParam {String} text                                Mandatory text.
 *
 * @apiSuccess {Number} status                            Status of the api.
 * @apiSuccess {Object} post                              Post created.
 * @apiSuccess {String} message                           Message of the api.
 * 
 */

 router.post('/:topicId/post', validator.validatePost(), async (req, res, next) => {
  try{
    const topic = await postService.createPost(req.user.user_id, req.params.topicId, req.body);
    return res.status(200).json(topic)
  }catch(err){
    next(err, req, res, next);
    throw err
  }
});

/**
 * @api {get} /api/topic/post Get Post
 * @apiVersion 0.0.1
 * @apiName getPosts
 * @apiGroup Posts
 * @apiDescription Get Post.
 * 
 * @apiHeader {String} authorization                      Users unique token.
 * 
 * @apiSuccess {Number} status                            Status of the api.
 * @apiSuccess {Object} posts                             Posts.
 * @apiSuccess {String} message                           Message of the api.
 * 
 */

 router.get('/post', async (req, res, next) => {
    try{
      const topic = await postService.getPosts(req.body);
      return res.status(200).json(topic)
    }catch(err){
      next(err, req, res, next);
      throw err
    }
});

module.exports = router;
