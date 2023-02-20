const router = require("express").Router();
const path = require("path");
const { Comment } =  require(path.join(__dirname, "../../models"));

// Create new comment
router.post("/", withAuth, async (req, res) => {
    try {
        const comment = await Comment.create({
            content: req.body.content,
            user_id: req.session.user_id,
            post_id: req.body.id
        });

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update existing comment
router.put("/:id", withAuth, async (req, res) => {
    try {
        const content = req.body.update;

        const comment = await Comment.update({
            content
        }, {
            where: {
                id: req.params.id
            }
        });

        if (!comment[0]) {
            res.status(404).json({ message: "Comment not found" });
            return;
        }

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete comment
router.delete("/:id", withAuth, async (req, res) => {
    try {
        const comment = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;