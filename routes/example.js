const router = require("express").Router();
const { ensureAuthenticated } = require("../config/auth");
const session = require("express-session");

// Example Page, Route ID: #3
router.get("/one", ensureAuthenticated, (req, res) => {
  if (session.routes.search(3) == "/example/one") {
    res.render("template", {
      title: "Example #1",
      name: req.user.user_name,
      email: req.user.user_email,
      lastLogin: "",
      success_msg: "This is for Admins, Supervisors & Customers",
      path: 3,
    });
  } else {
    req.flash("error_msg", "Sorry, Access Denied to Example #1");
    res.redirect("/profile");
  }
});

// Example Page, Route ID: #4
router.get("/two", ensureAuthenticated, (req, res) => {
  if (session.routes.search(4) == "/example/two") {
    res.render("template", {
      title: "Example #2",
      name: req.user.user_name,
      email: req.user.user_email,
      lastLogin: "",
      success_msg: "This is for Admins & Supervisors",
      path: 4,
    });
  } else {
    req.flash("error_msg", "Sorry, Access Denied to Example #2");
    res.redirect("/profile");
  }
});

module.exports = router;
