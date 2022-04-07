exports.registerShow = function (req, res) {
  res.render("authentication/register", {
    title: "Register",
  });
};
exports.loginShow = function (req, res) {
  res.render("authentication/login", {
    title: "Login",
  });
};
exports.changePasswordShow = function (req, res) {
  res.render("authentication/change-password", {
    title: "Change password",
  });
};
