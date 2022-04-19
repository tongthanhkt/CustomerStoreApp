const mongoose = require("mongoose");
const ProductsSchema = new mongoose.Schema({
  nameProduct: {
    type: String,
  },
  priceProduct: {
    type: String,
  },
  urlImage: {
    type: String,
  },
});
module.exports = mongoose.model("Products", ProductsSchema);
