const Product = require('../models/product');

module.exports = (app) => {

  /* GET home page. */
  app.get('/', (req, res) => {
    Product.find().exec((err, products) => {
      res.render('products-index', { products: products });    
    });
  });
}
