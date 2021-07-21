const router = require("express").Router();
const { ensureAuthenticated } = require("../config/auth");
const session = require("express-session");

// Admin Page, Route ID: #2
router.get("/", ensureAuthenticated, (req, res) => {
  if (session.routes.search(2) == "/admin/newrole") {
    res.render("admin", {
      name: req.user.user_name,
      email: req.user.user_email,
      pageMessage: "This is for administrators only",
    });
  } else {
    req.flash("error_msg", "Sorry, Access Denied to the Admin Page");
    res.redirect("/profile");
  }
});

module.exports = router;
