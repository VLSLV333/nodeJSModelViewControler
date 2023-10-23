const fs = require('fs');
const path = require('path');

const pathToCartFile = path.join(
  path.dirname(require.main.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static getCart(cb) {
    fs.readFile(pathToCartFile, (err, fileDate) => {
      if (!err) {
        cb(JSON.parse(fileDate));
      } else {
        cb({ products: [], totalPrice: 0 });
      }
    });
  }
  static addProduct(
    idToFind,
    quantityToAdd,
    productPrice,
    productTitle,
    productImage
  ) {
    // Fetch old cart
    fs.readFile(pathToCartFile, (err, fileData) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileData);
      }
      // Check if we already have this product
      const existingProduct = cart.products.find(
        (prod) => prod.id === idToFind
      );
      const existingProductId = cart.products.findIndex(
        (prod) => prod.id === idToFind
      );
      let updatedProduct = null;

      let cartWithoutUpdatedProduct = [...cart.products].filter(
        (prod) => prod.id !== idToFind
      );
      let cartTotalPriceWithoutUpdatedProduct =
        cartWithoutUpdatedProduct.reduce(
          (acc, prod) => acc + prod.price * prod.quantity,
          0
        );
      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.quantity += +quantityToAdd;
        updatedProduct.price = +productPrice;
        cart.products = [...cart.products];
        cart.products[existingProductId] = updatedProduct;
      } else {
        updatedProduct = {
          id: idToFind,
          quantity: +quantityToAdd,
          price: +productPrice,
          title: productTitle,
          imageUrl: productImage,
        };
        cart.products = [...cart.products, updatedProduct];
      }
      let currentProductTotalPrice = +productPrice * +updatedProduct.quantity;
      cart.totalPrice =
        cartTotalPriceWithoutUpdatedProduct + currentProductTotalPrice;
      fs.writeFile(pathToCartFile, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
  static deleteProduct(idToDelete, cb) {
    fs.readFile(pathToCartFile, (err, fileData) => {
      if (!err) {
        let cart = JSON.parse(fileData);
        let productToDelete = cart.products.find(
          (prod) => prod.id === idToDelete
        );
        if (productToDelete) {
          let prodToDeleteTotalPrice =
            productToDelete.quantity * productToDelete.price;
          let newCartProducts = [...cart.products].filter(
            (prod) => prod.id !== idToDelete
          );
          let newCartTotalPrice = cart.totalPrice - prodToDeleteTotalPrice;
          let newCart = {
            products: newCartProducts,
            totalPrice: newCartTotalPrice,
          };
          fs.writeFile(pathToCartFile, JSON.stringify(newCart), (err) => {
            console.log(err);
          });
        }
      }
    });
    return cb();
  }
};
