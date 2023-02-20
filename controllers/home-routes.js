const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");
const scripts = [{ script: "../public/js/login.js" }];
const { formatDate } = require("../utils/helpers");

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: ["id", "title", "createdDate", "content"],
            include: [{
                model: User,
                attributes: ["username"]
            }]
        });

        const posts = postData.map((post) => {
            return post.get({ plain: true });
        });
        
        posts.forEach((post) => {
            post.createdDate = formatDate(post.createdDate);
        });

        res.render("homepage", {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/dashboard");
        return;
    }

    res.render('login', scripts);
});

// User's posts (dashboard)
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: ["id", "title", "createdDate", "content"],
            include: [{
                model: User,
                attributes: ["username"]
            }]
        });

        const posts = postData.map((post) => {
            return post.get({ plain: true });
        });

        posts.forEach((post) => {
            post.createdDate = formatDate(post.createdDate);
        });

        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

// Post Details
router.get('/posts/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            attributes: ["id", "title", "createdDate", "content"],
            where: {
                id: req.params.id
            },
            include: [{
                model: User,
                attributes: ["username"]
            }]
        });

        const post = postData.get({ plain: true });

        post.createdDate = formatDate(post.createdDate);

        const commentData = await Comment.findAll({
            attributes: ["id", "dateCreated", "content"],
            where: {
                post_id: req.params.id
            },
            include: [{
                model: User,
                attributes: ["username"]
            }]
        });

        const comments = commentData.map((comment) => comment.get({ plain: true }));

        comments.forEach((comment) => {
            comment.dateCreated = formatDate(comment.dateCreated);
        });

        res.render('post-details', {
            post,
            comments,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

// New Post Form
router.get("/new-post", withAuth, async (req, res) => {
    let update = false;

    res.render("postform", {
        loggedIn: req.session.loggedIn,
        update
    });
});

// Update Post Form
router.get("/posts/:id/edit", withAuth, async (req, res) => {
    let update = true;

    try {
        const postData = await Post.findOne({
            attributes: ["id", "title", "createdDate", "content"],
            where: {
                id: req.params.id
            },
            include: [{
                model: User,
                attributes: ["username"]
            }]
        });

        const post = postData.get({ plain: true });

        res.render("postform", {
            loggedIn: req.session.loggedIn,
            update,
            post
        });
    } catch (error) {
        res.status(500).json(error);
    }

});

// New Comment Form
router.get("/posts/:post_id/add-comment", withAuth, async (req, res) => {
    let commentForm = true;
    let edit = false;

    try {
        const postData = await Post.findOne({
            attributes: ["id", "title", "createdDate", "content"],
            where: {
                id: req.params.post_id
            },
            include: [{
                model: User,
                attributes: ["username"]
            }]
        });

        const post = postData.get({ plain: true });

        res.render("post-details", {
            loggedIn: req.session.loggedIn,
            commentForm,
            edit,
            post
        })
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update Comment Form
router.get("/posts/:post_id/comments/:comment_id", withAuth, async (req, res) => {
    let commentForm = true;
    let edit = true;

    try {
        const postData = await Post.findOne({
            attributes: ["id", "title", "createdDate", "content"],
            where: {
                id: req.params.post_id
            },
            include: [{
                model: User,
                attributes: ["username"]
            }]
        });

        const post = postData.get({ plain: true });

        const commentData = await Comment.findOne({
            attributes: ["id", "dateCreated", "content"],
            where: {
                id: req.params.comment_id
            },
            include: [{
                model: User,
                attributes: ["username"]
            }]
        });

        const comment = commentData.get({ plain: true });

        res.render("post-details", {
            loggedIn: req.session.loggedIn,
            commentForm,
            edit,
            post,
            comment
        })
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;