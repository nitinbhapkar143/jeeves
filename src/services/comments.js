const commentsDataAccess = require("../dataAccess/comments");
const helperService = require("./helperService");
const randomstring = require("randomstring");
const moment = require("moment");

exports.createComment = async (userId, postId, comment) => {
    try{
        let slug = randomstring.generate(4);
        let full_slug = `${moment().format(`YYYYMMDDHHmmss`)}:${slug}`;
        if(comment.parent_id){
            const slug_info = await helperService.getSlugInfo(comment.parent_id);
            if(!slug_info) return res.json({
                status: true,
                message: `No Comment found with given id.`
            })
            slug = `${slug_info.slug}/${slug}`;
            full_slug = `${slug_info.full_slug}/${full_slug}`;
        }
        if (full_slug.length > 512) return res.json({
            status: true,
            message: `Maximum nesting level reached.`
        })
        const response = await commentsDataAccess.add(userId, postId, comment, slug, full_slug);
        if (!response || !response.length || !response[0].affectedRows) return {
            status: false,
            message: `Something went wrong. Please try later.`
        };
        const commentCreated = await commentsDataAccess.getById(response[0].insertId);
        return { status: true, message : `Comment created successfully.`, comment : commentCreated[0][0] };
    }catch(err){
        throw err
    }
}

exports.getComments = async query => {
    try{
        const response = await commentsDataAccess.get(query.limit, query.offset);
        if (!response || !response.length) return {
            status: false,
            message: `Something went wrong. Please try later.`
        };
        return { status: true, message : `Comment fetched successfully.`, comments : response[0] };
    }catch(err){
        throw err
    }
}

exports.getCommentsByPost = async (postId, query) => {
    try{
        const result = await commentsDataAccess.getByPost(postId, query.limit, query.offset);
        let comments = [], finalData = [];
        if (result && result.length && result[0].length) comments = result[0];
        while(comments.length){
            finalData = [...finalData,...comments.splice(helperService.lastIndexOf(comments))]
        }
        return {
            status: true,
            message : "Comments fetched successfully.",
            comments: finalData
        }
    }catch(err){
        throw err
    }
}