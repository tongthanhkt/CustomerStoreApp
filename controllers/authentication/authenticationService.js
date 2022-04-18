const User = require("../../Models/User");
const bcrypt = require("bcryptjs");
exports.register = async function (email, password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(password, salt);
  return User.create({
    email: email,
    password: hash,
  });
};
exports.isUserExist = async function (email) {
  return User.findOne({
    email: email,
  });
};
exports.verifyUser = async function (email, password) {
  const user = await User.findOne({
    email: email,
  });
  console.log(user);
  console.log(password);
  if (!user) {
    return false;
  }
  if (await bcrypt.compare(password, user.password)) {
    console.log("Successfully !!");
    return user;
  }
  return false;
};
