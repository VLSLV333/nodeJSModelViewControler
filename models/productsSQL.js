// const dataBase = require('../util/database');

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }
//   save() {
//     return dataBase.execute(
//       'INSERT INTO products (title,price,description,imageUrl) VALUES (?,?,?,?)',
//       [this.title, this.price, this.description, this.imageUrl]
//     );
//   }
//   static deleteByID(idToDelete) {}
//   static fetchAll() {
//     return dataBase.execute('SELECT * FROM products');
//   }
//   static findById(idToFind) {
//     return dataBase.execute('SELECT * FROM products WHERE products.id = ?', [idToFind])
//   }
// };
