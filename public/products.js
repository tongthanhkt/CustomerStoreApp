const productsDOM = document.querySelector(".product-grid");
console.log(productsDOM);
const showProducts = async () => {
  try {
    const {
      data: { products },
    } = await axios.get("api/v1/products");
    console.log(products);
    const allProducts = products
      .map((product) => {
        const { nameProduct, priceProduct, urlImage } = product;
        return `
      <div class="product-item men">
                  <div class="product_image">
                    <img
                    src="${urlImage}"
                      alt=""
                    />
                  </div>

                  <div class="product_info">
                      <a class="product_name" href="single.html"
                        >${nameProduct}</a
                      >
                    <div class="product_price">${priceProduct}</div>
                  </div>
                  <div class="red_button add_to_cart_button">
                    <a href="#">add to cart</a>
                  </div>
                </div>
    `;
      })
      .join("");
    productsDOM.innerHTML = allProducts;
  } catch (error) {
    console.log(error);
  }
};
showProducts();
