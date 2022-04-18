var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { connectionDB } = require("./db/connect");
var indexRouter = require("./routes/index");
const authenticationRouter = require("./controllers/authentication");
const User = require("./Models/User");
const bcrypt = require("bcryptjs");
const products = require("./routes/products");
const passport = require("./controllers/authentication/passport");
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
app.use(express.static(path.join(__dirname, "views")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
const JWT_SECRET = "abcdefgh";
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", authenticationRouter);
app.use("/", indexRouter);

// app.post("/api/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email }).lean();
//   if (!user) {
//     return res.json({ status: "Error", error: "Invalid username/password" });
//   }
//   if (await bcrypt.compare(password, user.password)) {
//     const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);
//     return res.json({ status: "ok", data: token });
//   }
//   return res.json({ status: "Error", error: "Invalid username/password" });
// });
app.post("/api/change-password", async (req, res) => {
  const { token, newPassword: plainTextPassword } = req.body;
  console.log(req.body);
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const _id = user.id;
    const password = await bcrypt.hash(plainTextPassword, 10);
    await User.updateOne(
      { _id },
      {
        $set: { password },
      }
    );
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Error" });
  }
});

app.get("/api/v1/user", async (req, res) => {
  try {
    const emailLoginUser = localStorage.getItem("email");
    console.log(emailLoginUser);
    const user = User.findOne({ emailLoginUser });
    console.log(user);
  } catch (error) {
    console.log(error);
  }
});
app.use("/api/v1/products", products);
// catch 404 and forward to error handler
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
