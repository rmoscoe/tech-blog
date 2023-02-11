const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");
const scripts = [{ script: "../public/js/login.js" }];

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
            post.get({ plain: true });
            // return post.dataValues;
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
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login', scripts);
});

// User's posts (dashboard)
router.get('/users/:user_id/posts', async (req, res) => {
    try {
        const postsData = await Post.findAll({
            attributes: ["id", "title", "createdDate", "content"],
            where: {
                user_id: req.params.user_id
            },
            include: [{
                model: User,
                attributes: ["username"]
            }]
        });

        const posts = postsData.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

// Post Details
router.get('/posts/:id/comments', async (req, res) => {
    try {
        const postData = await Post.findOne({
            attributes: ["id", "title", "createdDate", "content"],
            where: {
                id: req.params.id
            },
            include: [{
                model: User,
                attributes: ["username"]
            },
            {
                model: Comment,
                attributes: ["id", "dateCreated", "content", "user_id"],
                where: {
                    post_id: req.params.id
                },
                include: [{
                    model: User,
                    attributes: ["username"],
                    where: {
                        id: "user_id"
                    }
                }]
            }]
        });

        const entries = entryData.map((entry) => entry.get({ plain: true }));

        res.render('journal', {
            entries,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

// 
router.get('/journals/:id/entries/:entry_id', async (req, res) => {
    try {
        const entryData = await Entry.findByPk(req.params.entry_id);

        const entry = entryData.get({ plain: true });

        res.render('entry-details', {
            entry,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;