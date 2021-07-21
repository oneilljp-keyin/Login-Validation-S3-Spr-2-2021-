const express = require("express");
const app = express();
// const cors = require("cors");
const flash = require("connect-flash");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");

const pool = require("./config/db");

// Passport config
require("./config/passport")(passport);
require("dotenv").config();

// Middleware
// -- BodyParser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// For Links to CSS & ICO files
app.use("/views", express.static("views"));

// Routes
app.use("/", require("./routes/index"));
app.use("/signup", require("./routes/signup"));
app.use("/signin", require("./routes/signin"));
app.use("/logout", require("./routes/logout"));
app.use("/profile", require("./routes/profile")); // route_id: 1
app.use("/admin", require("./routes/admin")); // route_id: 2
app.use("/example", require("./routes/example")); // route_id: 3 & 4
app.use("/secret", require("./routes/secret")); // route_id: 5

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
