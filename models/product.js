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
  constructor(title) {
    this.title = title;
  }
  save() {
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
};
