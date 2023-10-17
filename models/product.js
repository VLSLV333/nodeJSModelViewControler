const fs = require('fs');
const path = require('path');

const saveProdPath = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

function getAllProducts(cb) {
  fs.readFile(saveProdPath, (err, fileData) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileData));
  });
}

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  save() {
    this.id = Math.random().toString();
    getAllProducts((prods) => {
      prods.push(this);
      fs.writeFile(saveProdPath, JSON.stringify(prods), (err) => {
        console.log(err);
      });
    });
  }
  static fetchAll(cb) {
    getAllProducts(cb);
  }
  static findById(idToFind, cb) {
    getAllProducts((arrayWithAllProds) => {
      cb(arrayWithAllProds.find((prod) => prod.id === idToFind));
    });
  }
};
