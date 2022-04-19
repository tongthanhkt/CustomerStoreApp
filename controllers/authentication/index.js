const express = require("express");
const router = express();
const passport = require("./passport");
const authenticationController = require("./authenticationController");
router.get("/login", authenticationController.loginShow);
router.get("/register", authenticationController.registerShow);
router.get("/logout", authenticationController.logout);
router.post("/register", authenticationController.register);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.get("/change-password", authenticationController.changePasswordShow);
router.get(
  "/api/check-email-exist/:email",
  authenticationController.checkEmailExist
);

module.exports = router;
