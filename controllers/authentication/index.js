const express = require("express");
const router = express();
const authenticationController = require("../authentication/authentication");
router.get("/register", authenticationController.registerShow);
router.get("/login", authenticationController.loginShow);
router.get("/change-password", authenticationController.changePasswordShow);
module.exports = router;
