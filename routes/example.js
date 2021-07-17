const router = require("express").Router();
const { ensureAuthenticated } = require("../config/auth");

// Example Page
router.get("/", ensureAuthenticated, (req, res) => {
  res.render("example", {
    name: req.user.user_name,
    email: req.user.user_email,
    authLevel: req.user.rbac,
  });
});

module.exports = router;
