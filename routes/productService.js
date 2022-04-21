const Products = require("../Models/Products");
exports.search = async (searchInput) => {
  return await Products.find({ nameProduct: { $regex: searchInput } });
};
