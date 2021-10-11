const express = require('express');
const router = express.Router();
const validator = require("../middleware/validator")
const commentService = require("../services/comments");

/**
 * @api {post} /api/topic/post/:postId/comment Create Comment
 * @apiVersion 0.0.1
 * @apiName createComment
 * @apiGroup Posts
 * @apiDescription Create Comment.
 * 
 * @apiHeader {String} authorization                      Users unique token.
 * 
 * @apiParam {String} text                                Mandatory comment text.
 * @apiParam {String} postId                              Mandatory Post Id.
 *
 * @apiSuccess {Number} status                            Status of the api.
 * @apiSuccess {Object} comment                           Comment created.
 * @apiSuccess {String} message                           Message of the api.
 * 
 */

router.post('/:postId/comment', validator.validateComment(),async (req, res, next) => {
    try{
    const comment = await commentService.createComment(req.user.user_id, req.params.postId, req.body);
    return res.status(200).json(comment)
  }catch(err){
    next(err, req, res, next);
    throw err
  }
});

/**
 * @api {get} /api/topic/post/:postId/comment?limit=:limit&offset=:offset Get Comment
 * @apiVersion 0.0.1
 * @apiName getComment
 * @apiGroup Posts
 * @apiDescription Get Comment.
 * 
 * @apiHeader {String} authorization                      Users unique token.
 * 
 * @apiParam {Number} postId                              Post Id.
 * @apiParam {Number} offset                              Page Number.
 * @apiParam {Number} limit                               Page Size.
 *
 * @apiSuccess {Number} status                            Status of the api.
 * @apiSuccess {Object} comments                          Comments.
 * @apiSuccess {String} message                           Message of the api.
 * 
 */

 router.get('/:postId/comment/', async (req, res, next) => {
    try{
        if(!req.params.postId){
            return res.status(400).json({
                status: false,
                comments: [],
                message: `Missing post id.`
            })
        }
        const comments = await commentService.getCommentsByPost(req.params.postId, req.query);
        return res.status(200).json(comments)
    }catch(err){
      next(err, req, res, next);
      throw err
    }
});

module.exports = router;
