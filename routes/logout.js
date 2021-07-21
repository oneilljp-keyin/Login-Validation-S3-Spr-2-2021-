const router = require("express").Router();

// Logout Handler
router.get("/", (req, res) => {
  req.logout();
  req.flash("success_msg", "You Are Logged Out");
  res.redirect("/logout/success");
});

// Welcome Page
router.get("/success", (req, res) => {
  req.session.destroy();
  res.render("logout");
});

module.exports = router;
