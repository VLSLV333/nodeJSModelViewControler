const Product = require('../models/product');

exports.postAddProduct = (req, res, next) => {
  new Product(
    req.body.title,
    req.body.imageUrl,
    req.body.description,
    req.body.price
  ).save();
  res.redirect('/');
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll((prodsArr) => {
    res.render('./admin/products.ejs', {
      prods: prodsArr,
      title: 'Admin Products BOSH',
      path: '/admin/products',
    });
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render('./admin/add-product', {
    title: 'Add Product BOSH ejs',
    path: '/admin/add-product',
  });
};
