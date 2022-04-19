const User = require("../../Models/User");
const authenticationService = require("./authenticationService");
exports.register = async function (req, res) {
  const { email, password } = req.body;
  const user = await authenticationService.isUserExist(email);
  if (user) {
    res.render("authentication/register", {
      title: "Register",
      error: "user is exist",
    });
    return;
  }
  await authenticationService.register(email, password);
  res.redirect("/");
};
exports.registerShow = function (req, res) {
  res.render("authentication/register", {
    title: "Register",
  });
};
exports.loginShow = function (req, res) {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("authentication/login");
  }
};
exports.logout = function (req, res) {
  req.logout();
  res.redirect("/");
};
exports.changePasswordShow = function (req, res) {
  res.render("authentication/change-password", {
    title: "Change password",
  });
};
exports.isUserExist = function (email) {
  return User.findOne({
    where: {
      email: email,
    },
    raw: true,
  });
};
exports.checkEmailExist = async (req, res) => {
  const user = await authenticationService.isUserExist(req.params.email);
  res.json(!!user);
};
