const router = require('express').Router();
const path = require("path");
const { User } = require(path.join(__dirname, '../../models'));

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
      req.session.logged_in = true;
      
      res.status(200).render("dashboard", {loggedIn: req.session.logged_in});
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;