var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const { connectionDB } = require("./db/connect");
var indexRouter = require("./routes/index");
const authenticationRouter = require("./controllers/authentication");
const User = require("./Models/User");
const bcrypt = require("bcryptjs");
const passport = require("./controllers/authentication/passport");
const productsRouter = require("./controllers/products");
require("dotenv").config();
var app = express();
const session = require("express-session");
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate("session"));
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});
// view engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", authenticationRouter);
app.use("/", indexRouter);
app.use(express.static(path.join(__dirname, "public")));
app.use("/products", productsRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
const connectionDb = async () => {
  try {
    await connectionDB(process.env.MONGO_URL);
    console.log("Database connect successfully !!");
  } catch (error) {
    console.log(error);
  }
};
connectionDb();

module.exports = app;
