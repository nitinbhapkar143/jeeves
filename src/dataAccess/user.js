const moment = require('moment');
const mysql = require(`../database/executor`);

exports.add = async (email, hashed) => {
    try {
        return await mysql.executeQuery([`INSERT INTO users(email, password, created) VALUES('${email}','${hashed}','${moment().format(`YYYY-MM-DD HH:mm:ss`)}')`]);
    }catch(err){
        throw err;
    }
}

exports.get = async (email) => {
    try {
        return await mysql.executeQuery([`SELECT id FROM users WHERE email='${email}'`]);
    }catch(err){
        throw err;
    }
}