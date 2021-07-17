const router = require("express").Router();
const passport = require("passport");

// Sign-in
router.get("/", (req, res) => {
  res.render("signin");
});

// Signin Handler
router.post("/", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/signin",
    failureFlash: true,
  })(req, res, next);
});

module.exports = router;
