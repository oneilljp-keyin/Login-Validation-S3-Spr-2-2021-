const router = require("express").Router();
const dateFormat = require("dateformat");

const { ensureAuthenticated } = require("../config/auth");

// Profile Page, Route ID: #1
router.get("/", ensureAuthenticated, (req, res) => {
  res.render("template", {
    title: "Profile",
    name: req.user.user_name,
    email: req.user.user_email,
    lastLogin: dateFormat(
      req.user.last_login,
      "dddd, mmmm dS, yyyy, h:MM:ss TT"
    ),
    success_msg: "Welcome to the profile page to see what you are all about",
    path: 1,
  });
});

module.exports = router;
