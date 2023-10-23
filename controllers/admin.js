const Product = require('../models/productSequelize');
const Cart = require('../models/cart');

exports.getAddProduct = (req, res, next) => {
  res.render('./admin/edit-product', {
    title: 'Add Product BOSH ejs',
    path: '/admin/add-product',
    editing: false,
    prod: null,
  });
};

exports.postAddProduct = (req, res, next) => {
  req.user
    .createProduct({
      // createProduct is automatically generated method by sequelize, because we have one-to-many relation
      title: req.body.title, //   created in app.js
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
    })
    // Product.create({
    //   title: req.body.title,
    //   price: req.body.price,
    //   imageUrl: req.body.imageUrl,
    //   description: req.body.description,
    //   userId: req.user.id,
    // })
    .then((result) => res.redirect('/admin/products'))
    .catch((err) => console.log(err));
};

exports.getAdminProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then((arrWithProdData) => {
      res.render('./admin/products.ejs', {
        prods: arrWithProdData,
        title: 'Admin Products BOSH',
        path: '/admin/products',
      });
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  // Product.findByPk(req.params.productID)
  req.user
    .getProducts({ where: { id: req.params.productID } })
    .then(([prod]) => {
      if (!prod) {
        return res.redirect('/');
      }
      res.render('./admin/edit-product', {
        title: 'Edit Product BOSH',
        path: '/admin/edit-product',
        editing: editMode,
        prod: prod,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  Product.findByPk(req.query.idToUpdate)
    .then((prod) => {
      prod.title = req.body.title;
      prod.price = req.body.price;
      prod.imageUrl = req.body.imageUrl;
      prod.description = req.body.description;
      return prod.save();
    })
    .then(() => res.redirect('/admin/products'))
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  // add deletion in cart aswell after deleting in admim
  Product.findByPk(req.body.idToDelete)
    .then((prod) => {
      return prod.destroy();
    })
    .then(() => res.redirect('/admin/products'))
    .catch((err) => console.log(err));
};
