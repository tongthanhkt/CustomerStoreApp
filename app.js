var express = require("express");
var app = express();
const { engine } = require("express-handlebars");
const expressHandlebarsSections = require("express-handlebars-sections");
var path = require("path");
var cookieParser = require("cookie-parser");
const { connectionDB } = require("./db/connect");
var indexRouter = require("./routes/index");
const authenticationRouter = require("./controllers/authentication");
const passport = require("./controllers/authentication/passport");
const productsRouter = require("./controllers/products");
require("dotenv").config();

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

app.set("views", path.join(__dirname, "views"));
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    helpers: {
      section: expressHandlebarsSections(),
    },
  })
);
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", authenticationRouter);
app.use("/", indexRouter);
app.use("/products", productsRouter);

//database set up
const connectionDb = async () => {
  try {
    await connectionDB(process.env.MONGO_URL);
    console.log("Database connect successfully !!");
  } catch (error) {
    console.log(error);
  }
};
connectionDb();
// view engine setup

app.use(function (req, res, next) {
  // next(createError(404));
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

module.exports = app;
