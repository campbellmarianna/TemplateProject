// mailer.js

// require our mailgun dependencies
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

// auth with our mailgun API key and domain
const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.EMAIL_DOMAIN
  }
}

// create a mailer
const nodemailerMailgun = nodemailer.createTransport(mg(auth));

// export our send mail function
module.exports.sendMail = (product, req, res) => {
    // send an email to the user's email with a provided template
    nodemailerMailgun.sendMail({
        from: 'no-reply@example.com',
        to: product.emailAddress, // An array if you have multiple
        subject: 'Hey you, awesome!',
        template: {
            name: 'email.handlebars',
            engine: 'handlebars',
            content: product
        }
    // One mail is sent, redirect to the product's show page
    }).then(info => {
        console.log('Response: ' + info);
        res.send({ product });
    // Catch error and redirect to the product's show page
    }).catch(err => {
        console.log('Error: ' + err);
        res.send({ product });
    });
}
