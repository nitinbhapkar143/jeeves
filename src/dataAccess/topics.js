const moment = require('moment');
const mysql = require(`../database/executor`);

exports.add = async (name) => {
    try {
        return await mysql.executeQuery([`INSERT INTO topics(name, created) VALUES('${name}','${moment().format(`YYYY-MM-DD HH:mm:ss`)}')`]);
    }catch(err){
        throw err;
    }
}

exports.getById = async (id) => {
    try {
        return await mysql.executeQuery([`SELECT * FROM topics WHERE id='${id}'`]);
    }catch(err){
        throw err;
    }
}

exports.get = async (limit = Number.MAX_SAFE_INTEGER, offset = 0) => {
    try {
        return await mysql.executeQuery([`SELECT * FROM topics limit ${limit} offset ${offset}`]);
    }catch(err){
        throw err;
    }
}