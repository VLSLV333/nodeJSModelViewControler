const Product = require('../models/productSequelize');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('./shop/index.ejs', {
        prods: products,
        title: 'Products ejs',
        path: '/products',
      });
    })
    .catch((err) => console.log(err));
};

exports.getProductDetails = (req, res, next) => {
  const productID = req.params.productID;
  Product.findAll({ where: { id: productID } })
    .then(([prod]) => {
      res.render('./shop/product-detail.ejs', {
        title: `${prod.title} details BOSH`,
        path: '/products',
        prod: prod,
      });
    })
    .catch((err) => console.log(err));
  // Product.findByPk(productID)
  //   .then((prod) => {
  // res.render('./shop/product-detail.ejs', {
  //   title: `${prod.title} details BOSH`,
  //   path: '/products',
  //   prod: prod,
  // });
  //   })
  //   .catch((err) => console.log(err));
};

exports.showAllProducts = (req, res, next) => {
  Product.findAll()
    .then((prods) => {
      res.render('./shop/product-list.ejs', {
        prods: prods,
        title: 'Vlad Shop ejs',
        path: '/product-list',
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          let totalPrice = products.reduce(
            (acc, prod) => prod.cartItem.quantity * prod.price + acc,
            0
          );
          res.render('./shop/cart.ejs', {
            title: 'Cart BOSJ ejs',
            path: '/cart',
            prods: products,
            totalPrice: totalPrice,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const productIdToAddToCart = req.body.productId;
  let productQuantityToAddToCart = +req.body.quantity;
  let fetchedCart = null;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productIdToAddToCart } });
    })
    .then(([prod]) => {
      if (prod) {
        // logic for existing product
        const oldQuantity = +prod.cartItem.quantity;
        productQuantityToAddToCart += oldQuantity;
        return prod;
      } else {
        // logic for new product
        return Product.findByPk(productIdToAddToCart);
      }
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: +productQuantityToAddToCart },
      });
    })
    .then(() => res.redirect('/cart'))
    .catch((err) => console.log(err));
};

exports.postDeleteCartItem = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: req.params.itemID } });
    })
    .then(([prod]) => prod.cartItem.destroy())
    .then(() => res.redirect('/cart'))
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart = null;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((prod) => {
              prod.orderItem = { quantity: prod.cartItem.quantity };
              return prod;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then(() => {
      return fetchedCart.setProducts(null);
    })
    .then((result) => res.redirect('/orders'))
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ['products'] })
    .then((orders) => {
      res.render('./shop/orders.ejs', {
        title: 'Orders BOSH ejs',
        path: '/orders',
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};
