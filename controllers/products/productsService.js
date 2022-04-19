const Products = require("../../Models/Products");
exports.list = async (offset, limit) => {
  return await Products.find({})
    .limit(limit)
    .skip(offset * limit);
};
exports.countProducts = async () => {
  return await Products.find({});
};
