const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const session = require("express-session");

const BinarySearchTree = require("binary-search-tree").BinarySearchTree;

const pool = require("./db");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          // Check if user exists (through error if false)
          const user = await pool.query(
            "SELECT users.*, user_roles.role_name FROM users JOIN user_roles using (role_id) WHERE user_email = $1",
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
            session.loggedIn = true;

            const bst_routes = new BinarySearchTree();

            const user_routes = await pool.query(
              "SELECT * FROM roles_and_routes \
               WHERE role_name = $1;",
              [user.rows[0].role_name]
            );

            user_routes.rows.forEach((route) => {
              bst_routes.insert(parseInt(route.route_id), route.route_name);
            });

            session.routes = bst_routes;

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
