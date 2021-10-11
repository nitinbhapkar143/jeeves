const express = require('express');
const router = express.Router();
const validator = require("../middleware/validator")
const topicService = require("../services/topics");

/**
 * @api {post} /api/topic Create Topic
 * @apiVersion 0.0.1
 * @apiName createTopic
 * @apiGroup Posts
 * @apiDescription Create Topic.
 * 
 * @apiHeader {String} authorization                      Users unique token.
 * 
 * @apiParam {String} name                                Mandatory topic name.
 *
 * @apiSuccess {Number} status                             Status of the api.
 * @apiSuccess {Object} topic                              Topic created.
 * @apiSuccess {String} message                            Message of the api.
 * 
 */

router.post('/', validator.validateTopic(), async (req, res, next) => {
  try{
    const topic = await topicService.createTopic(req.body);
    return res.status(200).json(topic)
  }catch(err){
    next(err, req, res, next);
    throw err
  }
});

/**
 * @api {get} /api/topic?limit=:limit&offset=:offset Get Topics
 * @apiVersion 0.0.1
 * @apiName getTopic
 * @apiGroup Posts
 * @apiDescription Get Topic.
 * 
 * @apiHeader {String} authorization                      Users unique token.
 * 
 * @apiParam {Number} offset                               Page Number.
 * @apiParam {Number} limit                               Page Size.
 *
 * @apiSuccess {Number} status                            Status of the api.
 * @apiSuccess {Object} topics                            Topics.
 * @apiSuccess {String} message                           Message of the api.
 * 
 */

 router.get('/', async (req, res, next) => {
    try{
      const topics = await topicService.getTopics(req.query);
      return res.status(200).json(topics)
    }catch(err){
      next(err, req, res, next);
      throw err
    }
});

module.exports = router;
