const postsDataAccess = require("../dataAccess/posts");

exports.createPost = async (userId, topicId, post) => {
    try{
        const response = await postsDataAccess.add(userId, topicId, post);
        if (!response || !response.length || !response[0].affectedRows) return {
            status: false,
            message: `Something went wrong. Please try later.`
        };
        const postCreated = await postsDataAccess.getById(response[0].insertId);
        return { status: true, message : `Post created successfully.`, post : postCreated[0][0] };
    }catch(err){
        throw err
    }
}
