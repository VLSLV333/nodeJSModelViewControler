const fs = require('fs');
const path = require('path');

const pathToCartFile = path.join(
  path.dirname(require.main.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(idToFind, quantityToAdd, productPrice) {
    // Fetch old cart
    fs.readFile(pathToCartFile, (err, fileData) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileData);
      }
      // Check if we already have this product
      const existingProduct = cart.products.find((prod) => prod.id === idToFind);
      const existingProductId = cart.products.findIndex((prod) => prod.id === idToFind);
      let updatedProduct = null;

    // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.quantity += +quantityToAdd;
        cart.products = [...cart.products]
        cart.products[existingProductId] = updatedProduct;
      } else {
        updatedProduct = { id: idToFind, quantity: +quantityToAdd };
        cart.products = [...cart.products, updatedProduct]
      }
      cart.totalPrice += +productPrice * +quantityToAdd
      fs.writeFile(pathToCartFile, JSON.stringify(cart), (err) =>{
        console.log(err)
      })
    });
  }
};
