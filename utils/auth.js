const withAuth = (req, res, next) => {
  console.log("auth.js line 2: ", req.session);
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;  