const moment = require('moment');
const mysql = require(`../database/executor`);

exports.add = async (userId, postId, comment, slug, fullSlug) => {
    try {
        return await mysql.executeQuery([`INSERT INTO comments(user_id, post_id, parent_id, slug, full_slug, text, posted) VALUES(${userId},${postId},${comment.parent_id ? comment.parent_id : 'NULL'},'${slug}','${fullSlug}','${comment.text}','${moment().format(`YYYY-MM-DD HH:mm:ss`)}')`]);
    }catch(err){
        throw err;
    }
}

exports.getById = async (id) => {
    try {
        return await mysql.executeQuery([`SELECT * FROM comments WHERE id='${id}'`]);
    }catch(err){
        throw err;
    }
}

exports.getByPost = async (postId, limit = Number.MAX_SAFE_INTEGER, offset = 0) => {
    try {
        return await mysql.executeQuery([`SELECT c.*, u.email FROM comments c INNER JOIN users u ON c.user_id = u.id WHERE post_id=${postId} ORDER BY full_slug ASC LIMIT ${limit} OFFSET ${offset}`]);
    }catch(err){
        throw err;
    }
}

