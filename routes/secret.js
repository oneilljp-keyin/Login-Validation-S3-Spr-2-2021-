const router = require("express").Router();
const { ensureAuthenticated } = require("../config/auth");

// Secret Page
router.get("/", ensureAuthenticated, (req, res) => {
  res.render("secret", {
    name: req.user.user_name,
    email: req.user.user_email,
    authLevel: req.user.rbac,
  });
});

module.exports = router;
