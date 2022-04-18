var passport = require("passport");
var LocalStrategy = require("passport-local");
const authenticationService = require("./authenticationService");

passport.use(
  new LocalStrategy({ usernameField: "email" }, async function verify(
    username,
    password,
    cb
  ) {
    console.log("Verify" + username + password);
    const user = await authenticationService.verifyUser(username, password);
    console.log(user);
    if (user) {
      return cb(null, user);
    }
    return cb(null, false);
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, user.email);
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
module.exports = passport;
