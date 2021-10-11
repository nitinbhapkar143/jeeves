const moment = require('moment');
const mysql = require(`../database/executor`);

exports.add = async (userId, topicId, post) => {
    try {
        return await mysql.executeQuery([`INSERT INTO posts(user_id, topic_id, text, posted) VALUES(${userId},${topicId},'${post.text}','${moment().format(`YYYY-MM-DD HH:mm:ss`)}')`]);
    }catch(err){
        throw err;
    }
}

exports.getById = async (id) => {
    try {
        return await mysql.executeQuery([`SELECT * FROM posts WHERE id='${id}'`]);
    }catch(err){
        throw err;
    }
}

exports.get = async (limit = Number.MAX_SAFE_INTEGER, offset = 0) => {
    try {
        return await mysql.executeQuery([`SELECT * FROM posts limit ${limit} offset ${offset}`]);
    }catch(err){
        throw err;
    }
}