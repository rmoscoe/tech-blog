const { Comment } = require("../models");

const commentdata = [
    {
        content: "You disappoint me, Mr. Anderson.",
        user_id: 2,
        post_id: 1
    },
    {
        content: "You know the question, just as I did.",
        user_id: 3,
        post_id: 1
    },
    {
        content: "Dodge this.",
        user_id: 3,
        post_id: 2
    },
    {
        content: "Whoa!",
        user_id: 1,
        post_id: 3
    },
    {
        content: "Fake news!",
        user_id: 3,
        post_id: 4
    },
    {
        content: "That sounds like a pretty good deal. But I think I've got a better one.",
        user_id: 1,
        post_id: 2
    }
];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;