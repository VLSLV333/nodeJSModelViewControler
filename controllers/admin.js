const Product = require('../models/product');
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
  new Product(
    null,
    req.body.title,
    req.body.imageUrl,
    req.body.description,
    req.body.price
  ).save(() => {
    res.redirect('/admin/products');
  });
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

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  Product.findById(req.params.productID, (prod) => {
    if (!prod) {
      return res.redirect('/');
    }
    res.render('./admin/edit-product', {
      title: 'Edit Product BOSH',
      path: '/admin/edit-product',
      editing: editMode,
      prod: prod,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  new Product(
    req.query.idToUpdate,
    req.body.title,
    req.body.imageUrl,
    req.body.description,
    req.body.price
  ).save(() => {
    res.redirect('/admin/products');
  });
};

exports.postDeleteProduct = (req, res, next) => {
  Product.deleteByID(req.body.idToDelete, () => {
    Cart.deleteProduct(req.body.idToDelete, () => {
      res.redirect('/admin/products');
    });
  });
};
