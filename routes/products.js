// PRODUCT MODELS
const Product = require('../models/product');

// UPLOADING TO AWS S3
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const Upload = require('s3-uploader');

const client = new Upload(process.env.S3_BUCKET, {
    aws: {
        path: 'pets/avatar',
        region: process.env.S3_REGION,
        acl: 'public-read',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    cleanup: {
        versions: true,
        original: true
    },
    versions: [{
        maxWIdth: 400,
        aspect: '16:10',
        suffix: '-standard'
    },{
        maxWidth: 300,
        aspect: '1:1',
        suffix: '-square'
    }]
});

// Product ROUTES
module.exports = (app) => {
    // INDEX Product => index.js

    // NEW Product
    app.get('/products/new', (req, res) => {
      res.render('products-new');
    });

    // CREATE Product
    app.post('/products', upload.single('avatar'), (req, res, next) => {
        console.log("req.file")
        var product = new Product(req.body);
        product.save(function (err) {
            if (err) {
                console.log(err)
                return res.status(400).send({ err: err })
            }
            if (req.file) {
                client.upload(req.file.path, {}, function (err, versions, meta) {
                    // STATUS OF 400 FOR VALIDATIONS
                    if (err) {
                        console.log(err)
                        return res.status(400).send({ err: err })
                    };

                    // versions.forEach(function (image) {
                    let imgUrlArray = versions[0].url.split('-');
                    imgUrlArray.pop();
                    url = imgUrlArray.join('-')
                    product.avatarUrl = url;
                    product.save();
                    // });

                    res.send({ product });
                });
            } else {
                res.send({ product})
            }
        });
        // .then((product) => {
        //   res.redirect(`/products/${product._id}`);
        // })
        // .catch((err) => {
        //   // Handle Errors
        // }) ;
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
