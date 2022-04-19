const { list } = require("./productsService");
const { countProducts } = require("./productsService");
const ITEMS_PER_PAGE = 3;
exports.list = async (req, res, next) => {
  let { page } = req.query;
  if (!page || isNaN(page)) page = 1;
  else page = parseInt(page);
  const products = await list(page - 1, ITEMS_PER_PAGE);
  const sumProducts = await countProducts();
  const count = sumProducts.length;
  const totalPage = Math.ceil(count / ITEMS_PER_PAGE);
  const nextPage = page + 1;
  const previousPage = page - 1;
  console.log(page);
  console.log(products);
  res.render("products/list", {
    products,
    pages: Array.from(Array(totalPage).keys()).map((i) => i + 1),
    nextPage,
    previousPage,
  });
};
