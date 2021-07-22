const router = require("express").Router();
const { ensureAuthenticated } = require("../config/auth");
const session = require("express-session");

// Secret Page, Route ID: 5
router.get("/", ensureAuthenticated, (req, res) => {
  if (session.routes.search(5) == "/secret") {
    res.render("template", {
      title: "Secret",
      name: req.user.user_name,
      email: req.user.user_email,
      lastLogin: "",
      success_msg: "You must be privileged to access this page",
      path: 5,
    });
  } else {
    req.flash("error_msg", "Sorry, Access Denied to the Secret Page");
    res.redirect("/profile");
  }
});

module.exports = router;
