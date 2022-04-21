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
  typeProduct: {
    type: String,
  },
  description: {
    type: String,
  },
});
module.exports = mongoose.model("Products", ProductsSchema);
