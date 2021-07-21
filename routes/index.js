const express = require("express");
const session = require("express-session");
const router = express.Router();

// Welcome Page
router.get("/", (req, res) => {
  res.render("welcome");
});

module.exports = router;
