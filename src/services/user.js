const jwt = require('jsonwebtoken');
const hash = require('bcryptjs');
const userDataAccess = require("../dataAccess/user");
const mailer = require("../email/mailer");

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

exports.login = async user => {
    try{
        const result = await userDataAccess.get(user.email);
        if (!result || !result.length || !result[0].length) return { status: false, message: `Incorrect email or password.` }
        const match = await hash.compare(user.password, result[0][0].password);
        if (!match) return { status: false, message: `Incorrect email or password.` }
        const token = jwt.sign({email: user.email, user_id: result[0][0].id }, process.env.JWT_SECRET);
        mailer.sendMail(user.email);
        return { status: true, token, message : `User logged in successfully.` }
    }catch(err){
        throw err
    }
}