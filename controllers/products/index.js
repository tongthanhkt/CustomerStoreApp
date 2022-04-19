const express = require("express");
const router = express.Router();
/* GET home page. */
const productController = require("./productsController");
router.get("/", productController.list);
router.get("/:idProduct");
module.exports = router;
