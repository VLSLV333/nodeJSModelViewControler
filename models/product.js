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
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  save(cb) {
    if (!this.id) {
      this.id = Math.random().toString();
      getAllProducts((prods) => {
        prods.push(this);
        fs.writeFile(saveProdPath, JSON.stringify(prods), (err) => {
          console.log(err);
        });
      });
    } else {
      getAllProducts((prods) => {
        const updatedProdIndex = prods.findIndex((prod) => prod.id === this.id);
        const prodsAfterUpdate = [...prods];
        prodsAfterUpdate[updatedProdIndex] = this;
        fs.writeFile(saveProdPath, JSON.stringify(prodsAfterUpdate), (err) => {
          console.log(err);
        });
      });
    }
    return cb();
  }
  static deleteByID(idToDelete, cb) {
    this.fetchAll((arrAllProds) => {
      const newProdsArray = [...arrAllProds].filter(
        (prod) => prod.id !== idToDelete
      );
      fs.writeFile(saveProdPath, JSON.stringify(newProdsArray), (err) => {
        console.log(err);
      });
    });
    return cb()
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
