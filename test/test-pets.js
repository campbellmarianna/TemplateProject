const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const Product = require('../models/product');

const fido =     {
    "name": "Norman",
    "species": "Greyhound",
    "birthday": "2008-11-11",
    "favoriteFood": "Liver",
    "picUrl": "http://www.gpamass.com/s/img/emotionheader713297504.jpg",
    "picUrlSq": "https://www.collinsdictionary.com/images/thumb/greyhound_21701074_250.jpg",
    "description": "Fido is a dog and he's a good dog who loves to play and hang out with his owners. He also likes to nap and enjoys eating dog food"
}

chai.use(chaiHttp);

describe('Products', ()  => {

  after(() => {
    Product.deleteMany({$or: [{name: 'Norman'}, {name: 'Spider'}] }).exec((err, products) => {
      console.log(products)
      products.remove();
    })
  });

  // TEST INDEX
  it('should index ALL products on / GET', (done) => {
    chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });

  // TEST NEW
  it('should display new form on /products/new GET', (done) => {
    chai.request(server)
      .get(`/products/new`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
  });

  // TEST CREATE
  it('should create a SINGLE product on /products POST', (done) => {
    chai.request(server)
        .post('/products')
        .send(fido)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
  });

  // TEST SHOW
  it('should show a SINGLE product on /products/<id> GET', (done) => {
    var product = new Product(fido);
     product.save((err, data) => {
       chai.request(server)
         .get(`/products/${data._id}`)
         .end((err, res) => {
           res.should.have.status(200);
           res.should.be.html
           done();
         });
     });

  });

  // TEST EDIT
  it('should edit a SINGLE product on /products/<id>/edit GET', (done) => {
    var product = new Product(fido);
     product.save((err, data) => {
       chai.request(server)
         .get(`/products/${data._id}/edit`)
         .end((err, res) => {
           res.should.have.status(200);
           res.should.be.html
           done();
         });
     });
  });


  // TEST UPDATE
  it('should update a SINGLE product on /products/<id> PUT', (done) => {
    var product = new Product(fido);
    product.save((err, data)  => {
     chai.request(server)
      .put(`/products/${data._id}?_method=PUT`)
      .send({'name': 'Spider'})
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
    });
  });

  // TEST DELETE
  it('should delete a SINGLE product on /products/<id> DELETE', (done) => {
    var product = new Product(fido);
    product.save((err, data)  => {
     chai.request(server)
      .delete(`/products/${data._id}?_method=DELETE`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
    });
  });
});
