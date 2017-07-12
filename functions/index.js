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
exports.sendEmailConfirmation = functions.database.ref('responses_details/responses/{response_no}').onWrite(event => {
  const snapshot = event.data;
  const val = snapshot.val();
  const mailOptions = {
    from: '"99X Technology" <noreply@firebase.com>',
    to: val.user.email
  };

  // var response = []; 
  // for (var i = 0; i < val.response.length; i++) {
  // 	var question = val.response[i];
  // }

  const text = "Hi! " + val.user.name + ", \n Thanks you for the response.  The saved response is \n " +
   JSON.stringify(val.response, null, 2).replace(/[&\/\\#,\[\]+()$~%.'"*?<>{}]/g, '') + 
   " \n Save another response at: https://test-ddf10.firebaseapp.com/"; 

    mailOptions.subject = 'You response was saved!';
    mailOptions.text = text;
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('New subscription confirmation email sent to:', val.email);
    }).catch(error => {
      console.error('There was an error while sending the email:', error);  
    });
});
