const postsDataAccess = require("../dataAccess/posts");
const topicsDataAccess = require("../dataAccess/topics");

exports.createTopic = async topic => {
    try{
        const response = await topicsDataAccess.add(topic.name);
        if (!response || !response.length || !response[0].affectedRows) return {
            status: false,
            message: `Something went wrong. Please try later.`
        };
        const topicCreated = await topicsDataAccess.get(response[0].insertId);
        return { status: true, message : `Topic created successfully.`, topic : topicCreated[0][0] };
    }catch(err){
        throw err
    }
}