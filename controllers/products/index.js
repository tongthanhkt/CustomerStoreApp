const express = require("express");
const { route } = require("../authentication");
const router = express.Router();
/* GET home page. */
const productController = require("./productsController");
router.get("/", productController.list);
router.post("/", productController.search);
router.get("/:typeProduct", productController.category);
router.get("/:typeProduct/:idProduct", productController.detail);
module.exports = router;
