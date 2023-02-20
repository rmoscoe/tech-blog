const router = require('express').Router();
const path = require("path");
const { User } = require(path.join(__dirname, '../../models'));

// Create user record
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password
    });

    const {id} = userData.get({ plain: true });

    req.session.save(() => {
      req.session.user_id = id;
      req.session.loggedIn = true;

      res.status(200).redirect("../dashboard");
    })
  } catch (error) {
    res.status(500).json(error);
  }
})

// Log a user in
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    const validPassword = userData.checkPassword(req.body.password, userData.dataValues.password)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
    
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      
      res.status(200).render("dashboard", {loggedIn: req.session.loggedIn});
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Log a user out
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Update a user record
router.put("/:id", withAuth, async (req, res) => {
  try {
    const { username, password } = req.body.updates;

    const user = await User.update({
      username,
      password
    }, {
      where: {
        id: req.params.id
      }
    });

    if (!user[0]) {
      res.status(400).json({ message: "Invalid username or password." });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete a user record
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const user = await User.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;