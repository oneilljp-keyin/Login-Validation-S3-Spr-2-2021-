const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const pool = require("./db");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          // Check if user exists (through error if false)
          const user = await pool.query(
            "SELECT * FROM users WHERE user_email = $1",
            [email.toLowerCase()]
          );
          if (user.rows.length === 0) {
            return done(null, false, {
              message: "Incorrect Email or Password",
            });
          }

          // Check if incoming password is valid
          const validPassword = await bcrypt.compare(
            password,
            user.rows[0].user_password
          );
          if (!validPassword) {
            return done(null, false, {
              message: "Incorrect Email or Password",
            });
          } else {
            return done(null, user.rows[0]);
          }
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Connection Error");
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
