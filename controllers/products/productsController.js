const {
  list,
  countProducts,
  listFilterCategory,
  getProduct,
  search,
} = require("./productsService");
const ITEMS_PER_PAGE = 10;
exports.list = async (req, res, next) => {
  let { page } = req.query;
  console.log(page);
  if (!page || isNaN(page)) page = 1;
  else page = parseInt(page);
  const products = await list(page - 1, ITEMS_PER_PAGE);
  console.log(products);
  const sumProducts = await countProducts();
  const count = sumProducts.length;
  const totalPage = Math.ceil(count / ITEMS_PER_PAGE);
  const nextPage = page + 1;
  const previousPage = page - 1;
  res.render("products/list", {
    products,
    pages: Array.from(Array(totalPage).keys()).map((i) => i + 1),
    nextPage,
    previousPage,
  });
};
exports.category = async (req, res) => {
  const { typeProduct, idProduct } = req.params;

  const products = await listFilterCategory(typeProduct);
  res.render("products/category", { products });
};
exports.detail = async (req, res) => {
  const { idProduct } = req.params;
  console.log(idProduct);
  const products = await getProduct(idProduct);
  const product = products[0];
  res.render("products/detail", { product });
};
exports.search = async (req, res) => {
  const { searchValue } = req.body;
  const products = await search(searchValue);
  console.log(products);
  res.render("products/category", { products });
};
