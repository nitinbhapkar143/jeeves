const postsDataAccess = require("../dataAccess/posts");
const commentsDataAccess = require("../dataAccess/comments");

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

exports.getPosts = async query => {
    try{
        const response = await postsDataAccess.get(query.limit, query.offset);
        if (!response || !response.length) return {
            status: false,
            message: `Something went wrong. Please try later.`
        };
        const promises = [], posts = [];
        for(let post of response[0]){
            promises.push(getCommentsForPost(post, posts))
        }
        await Promise.all(promises);
        return { status: true, message : `Posts fetched successfully.`, posts };
    }catch(err){
        throw err
    }
}

const getCommentsForPost = async(post, posts) => {
    try{
        const comments = await commentsDataAccess.getByPost(post.id);
        post.comments = [];
        if(comments && comments.length && comments[0].length) post.comments = comments[0];
        posts.push(post);
    }catch(err){
        throw err
    }

}
