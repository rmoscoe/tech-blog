const router = require("express").Router();
const path = require("path");
const { Post } = require(path.join(__dirname, "../../models"));
const withAuth = require("../../utils/auth");

// Create new post
router.post("/", withAuth, async (req, res) => {
    try {
        console.log(req.body.title, req.body.body, req.session.user_id);
        const post = await Post.create({
            title: req.body.title,
            content: req.body.body,
            user_id: req.session.user_id
        });
        
        res.status(200).redirect("../../dashboard");
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update post
router.put("/:id", withAuth, async (req, res) => {
    try {
        const { title, content } = req.body;
        console.log(req.body);
        const post = await Post.update({
            title,
            content
        }, {
            where: {
                id: req.params.id
            }
        });

        if (!post[0]) {
            res.status(404).json({ message: "Post not found." });
            return;
        }

        res.status(200).end();
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete post
    router.delete("/:id", withAuth, async (req, res) => {
        try {
            const post = await Post.destroy({
                where: {
                    id: req.params.id
                }
            });

            res.status(200).json(post);
        } catch (error) {
           res.status(500).json(error); 
        }
    });

module.exports = router;