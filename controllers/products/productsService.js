const Products = require("../../Models/Products");
exports.list = async (offset, limit) => {
  return await Products.find({})
    .limit(limit)
    .skip(offset * limit);
};
exports.countProducts = async () => {
  return await Products.find({});
};
exports.listFilterCategory = async (typeProduct) => {
  return await Products.find({ typeProduct: typeProduct });
};
exports.getProduct = async (id) => {
  return await Products.find({ _id: id });
};
exports.search = async (searchInput) => {
  return await Products.find({ nameProduct: { $regex: searchInput } });
};
