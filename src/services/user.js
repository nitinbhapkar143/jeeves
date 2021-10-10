const jwt = require('jsonwebtoken');
const hash = require('bcryptjs');
const userDataAccess = require("../dataAccess/user");

exports.signup = async user => {
    try{      
        const result = await userDataAccess.get(user.email);
        if (result && result.length && result[0].length) return { status: false, message: `User already exists with email.` }
        const salt = await hash.genSalt(10);
        const hashed = await hash.hash(user.password, salt)
        const insertResponse = await userDataAccess.add(user.email, hashed);
        if (!insertResponse || !insertResponse.length || !insertResponse[0].affectedRows) return {
            status: false,
            message: `Something went wrong. Please try later.`
        };
        return {
            status: true,
            message: `User created successfully.`,
            user : user
        } 
    }catch(err){
        throw err
    }
}