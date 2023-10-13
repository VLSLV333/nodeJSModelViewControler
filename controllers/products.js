const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    title: 'Add Product BOSH ejs',
    path: '/admin/add-product',
    formCss: true,
    prodCss: true,
    activeProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  new Product(req.body.title).save();
  res.redirect('/');
};

exports.showAllProducts = (req, res, next) => {
  Product.fetchAll((prodsArr) => {
    res.render('shop', {
      prods: prodsArr,
      title: 'Vlad Shop ejs',
      path: '/shop',
      prodAdded: !!prodsArr.length,
      prodCss: true,
      activeShop: true,
    });
  });
};
