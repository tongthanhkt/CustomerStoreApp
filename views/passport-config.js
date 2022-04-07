const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const async = require("hbs/lib/async");
function initialize(passport, getUserByEmail, getUserById) {
  const autheicateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);
    if (user == null) {
      return done(null, false, { message: "No user with that email" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (error) {
      return done(e);
    }
  };
}
passport.user(new LocalStrategy({ usernameField: "email" }, autheicateUser));
passport.serializeUser((user, done) => done(null, user.id));
passport.desrializeUser(async (id, done) => {
  return done(null, await getUserById(id));
});
module.exports = initialize;
