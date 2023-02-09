const { Post } = require("../models");

const postdata = [
    {
        title: "What Is the Matrix?",
        content: "A wise man once told me the Matrix is everywhere. It is all around us. Even now, in this very room. It is the world that has been pulled over your eyes to blind you from the truth that you are a slave. What is the Matrix? Control. It is a prison for your mind, designed to turn a human being into a battery.",
        user_id: 1
    },
    {
        title: "The First Matrix",
        content: "Did you know that the first Matrix was designed to be a perfect human world where none suffered, and everyone was happy? It was a disaster. No one would accept the program; entire crops were lost. Some believed that we lacked the programming langauge to describe your perfect world, but I believe that as a species, human beings describe your reality through misery and suffering. The perfect world was a dream your primitive cerebrums kept trying to wake up from.",
        user_id: 2
    },
    {
        title: "JavaScript Is the Best Programming Language",
        content: "Not only is JavaScript easier to learn than low-level languages like C, but you can use it for both the front end and the back end of an application. For my money, you really can't beat JavaScript as a programming language.",
        user_id: 3
    },
    {
        title: "To Catch a Hacker",
        content: "Everything starts with surveillance. You need to know the hacker's target. Once you have that information, it is a fairly straightforward process to catch a hacker. You'll need a search running to find the hacker's target. Then you just bug the target and wait for the hacker to come to you.",
        user_id: 2
    }
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;