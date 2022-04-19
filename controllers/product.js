const Products = require("../Models/Products");
const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};
module.exports = { getAllProducts };
