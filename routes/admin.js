const router = require("express").Router();
const { ensureAuthenticated } = require("../config/auth");

// Admin Page
router.get("/", ensureAuthenticated, (req, res) => {
  res.render("admin", {
    name: req.user.user_name,
    email: req.user.user_email,
    authLevel: req.user.rbac,
  });
});

module.exports = router;
