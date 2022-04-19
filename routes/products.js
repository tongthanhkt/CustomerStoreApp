const express = require("express");
const router = express.Router();
// const { getAllProducts } = require("../controllers/products");
// router.route("/").get(getAllProducts);
router.get("/", function (req, res, next) {
  res.render("products/list", { title: "Express" });
});
router.get("/:productId", function (req, res, next) {
  res.render("products/details");
});
module.exports = router;
