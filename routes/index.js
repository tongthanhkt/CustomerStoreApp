var express = require("express");
var router = express.Router();
/* GET home page. */
const { search } = require("./productService");
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
