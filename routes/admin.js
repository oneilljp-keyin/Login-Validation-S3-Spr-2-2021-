const router = require("express").Router();
const { ensureAuthenticated } = require("../config/auth");
const session = require("express-session");

// Admin Page, Route ID: #2
router.get("/newrole", ensureAuthenticated, (req, res) => {
  if (session.routes.search(2) == "/admin/newrole") {
    res.render("template", {
      title: "Admin Page",
      name: req.user.user_name,
      email: req.user.user_email,
      lastLogin: "",
      success_msg: "This is for administrators only",
      path: 2,
    });
  } else {
    req.flash("error_msg", "Sorry, Access Denied to the Admin Page");
    res.redirect("/profile");
  }
});

module.exports = router;
