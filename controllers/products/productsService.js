const Products = require("../../Models/Products");
exports.list = async (offset, limit) => {
  return await Products.find({})
    .lean()
    .limit(limit)
    .skip(offset * limit);
};
exports.countProducts = async () => {
  return await Products.find({}).lean();
};
exports.listFilterCategory = async (typeProduct) => {
  return await Products.find({ typeProduct: typeProduct }).lean();
};
exports.getProduct = async (id) => {
  return await Products.find({ _id: id }).lean();
};
exports.search = async (searchInput) => {
  return await Products.find({ nameProduct: { $regex: searchInput } }).lean();
};
