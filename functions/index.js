'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(
    `smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

// Sends an email when a user responded for confirmation.
exports.sendEmailConfirmation = functions.database.ref('responses_details/responses/{response_no}/user').onWrite(event => {
  const snapshot = event.data;
  const val = snapshot.val();
  const mailOptions = {
    from: '"99X Technology" <noreply@firebase.com>',
    to: val.email
  };

    mailOptions.subject = 'You response was saved!';
    mailOptions.text = 'Thanks you for the response. We will consider all these .';
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('New subscription confirmation email sent to:', val.email);
    }).catch(error => {
      console.error('There was an error while sending the email:', error);  
    });
});
