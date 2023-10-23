const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const show404 = require('./controllers/404').show404;

const sequalize = require('./util/databaseSequelize');
const Product = require('./models/productSequelize'); // need this import for sequalize to auto create table in DB
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user; // by this we create new field in req object, so req.user was undefined, now we've stored user from our db
      //  in our req object req.user = user. Also the 'user' we've saved her is the object created by sequelize with all it's methods
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use('/', show404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

let userToCreateCart = null;

sequalize
  // .sync({ force: true }) // overrites my existing tables with new options. usually not used for production!
  .sync()
  .then((result) => User.findByPk(1))
  .then((user) => {
    if (!user) {
      return User.create({ name: 'Vladyslav', email: 'test@gmail.com' });
    }
    return user;
  })
  .then((user) => {
    userToCreateCart = user;
    return user.getCart();
  })
  .then((cart) => {
    if (cart) {
      return cart;
    } else {
      return userToCreateCart.createCart();
    }
  })
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));
