const router = require("express").Router();
const session = require("express-session");

const { ensureAuthenticated } = require("../config/auth");

// Profile Page, Route ID: #1
router.get("/", ensureAuthenticated, (req, res) => {
  res.render("profile", {
    name: req.user.user_name,
    email: req.user.user_email,
    authLevel: req.user.rbac,
  });
});

module.exports = router;
