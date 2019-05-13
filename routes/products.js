// PRODUCT MODELS
const Product = require('../models/product');

// Product ROUTES
module.exports = (app) => {

  // INDEX Product => index.js

  // NEW Product
  app.get('/products/new', (req, res) => {
    res.render('products-new');
  });

  // CREATE Product
  app.post('/products', (req, res) => {
    var product = new Product(req.body);

    product.save()
      .then((product) => {
        res.redirect(`/products/${product._id}`);
      })
      .catch((err) => {
        // Handle Errors
      }) ;
  });

  // SHOW Product
  app.get('/products/:id', (req, res) => {
    Product.findById(req.params.id).exec((err, product) => {
      res.render('products-show', { product: product });
    });
  });

  // EDIT Product
  app.get('/products/:id/edit', (req, res) => {
    Product.findById(req.params.id).exec((err, product) => {
      res.render('products-edit', { product: product });
    });
  });

  // UPDATE Product
  app.put('/products/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body)
      .then((product) => {
        res.redirect(`/products/${product._id}`)
      })
      .catch((err) => {
        // Handle Errors
      });
  });

  // DELETE Product
  app.delete('/products/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id).exec((err, product) => {
      return res.redirect('/')
    });
  });

  // SEARCH Product
  app.get('/search', (req, res) => {
      // Use a modifier i to do case-insensitive matching
      term = new RegExp(req.query.term, 'i')

      Product.find({$or:[
          {'name': term},
          {'category': term}
      ]}).exec((err, products) => {
          res.render('products-index', { products: products });
      })
  });
}
