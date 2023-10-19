const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((prodsArr) => {
    res.render('./shop/index.ejs', {
      prods: prodsArr,
      title: 'Products ejs',
      path: '/products',
    });
  });
};

exports.getProductDetails = (req, res, next) => {
  const productID = req.params.productID;
  Product.findById(productID, (prod) => {
    res.render('./shop/product-detail.ejs', {
      title: `${prod.title} details BOSH`,
      path: '/products',
      prod: prod,
    });
  });
};

exports.showAllProducts = (req, res, next) => {
  Product.fetchAll((prodsArr) => {
    res.render('./shop/product-list.ejs', {
      prods: prodsArr,
      title: 'Vlad Shop ejs',
      path: '/product-list',
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    res.render('./shop/cart.ejs', {
      title: 'Cart BOSJ ejs',
      path: '/cart',
      prods: cart.products,
      totalPrice: cart.totalPrice,
    });
  });
};

exports.postCart = (req, res, next) => {
  const productIdToAddToCart = req.body.productId;
  const productQuantityToAddToCart = req.body.quantity;
  Product.findById(productIdToAddToCart, (prod) => {
    Cart.addProduct(
      productIdToAddToCart,
      productQuantityToAddToCart,
      prod.price,
      prod.title,
      prod.imageUrl,
      () => {
        res.redirect('/cart');
      }
    );
  });
};

exports.postDeleteCartItem = (req, res, next) => {
  Cart.deleteProduct(req.params.itemID, () => {
    res.redirect('/cart');
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('./shop/checkout.ejs', {
    title: 'Checkout BOSH ejs',
    path: '/checkout',
  });
};

exports.getOrders = (req, res, next) => {
  res.render('./shop/orders.ejs', {
    title: 'Orders BOSH ejs',
    path: '/orders',
  });
};
