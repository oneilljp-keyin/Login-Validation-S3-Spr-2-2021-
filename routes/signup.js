const router = require("express").Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

const pool = require("../config/db");

// Sign-Up/Register
router.get("/", (req, res) => {
  res.render("signup");
});

// Sign-Up Handle
router.post("/", async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Check requried fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please Fill In All Fields" });
  }

  // Check passwords match
  if (password !== password2) {
    errors.push({ msg: "Pasword Fields Do Not Match" });
  }

  // Check passwords length
  if (password.length < 6) {
    errors.push({ msg: "Please Needs To Be At Least 6 Characters" });
  }

  if (errors.length > 0) {
    res.render("signup", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    // when validation passes, send info to database
    // first check if user exists, which will return an error
    // or insert new user if no error
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      errors.push({ msg: "Email is already registered" });
      res.render("signup", {
        errors,
        name,
        email,
        password,
        password2,
      });
    } else {
      // Bcrypt the user password
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      const bcryptPassword = await bcrypt.hash(password, salt);

      // Enter the new user into the database
      const newUser = await pool.query(
        "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
        [name, email.toLowerCase(), bcryptPassword]
      );

      req.flash(
        "success_msg",
        `Congratulations ${newUser.rows[0].user_name}, You May Now Log In`
      );
      res.redirect("/signin");
    }
  }
});

module.exports = router;
