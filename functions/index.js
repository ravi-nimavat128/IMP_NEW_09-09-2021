const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const stripe = require('stripe')(
  'sk_test_51IDmWtD1m7XeWX6yeY6oVWAFxW1SVYDU1AnHwtaDbHWzmlj3SnXF2yuLif9gcEZDnZSUOqoRfBbCf1lzAwJwyJYA00mgX0g2Kp',
);

// exports.payWithStripe = functions.https.onRequest((request, response) => {
//   // Set your secret key: remember to change this to your live secret key in production
//   // See your keys here: https://dashboard.stripe.com/account/apikeys

//   // eslint-disable-next-line promise/catch-or-return
//   stripe.charges
//     .create({
//       amount: request.body.amount,
//       currency: request.body.currency,
//       source: request.body.token,
//     })
//     .then(charge => {
//       // asynchronously called
//       response.send(charge);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });
exports.CompletePaymentWithStripe = functions.https.onRequest(
  (request, response) => {
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys

    // eslint-disable-next-line promise/catch-or-return
    stripe.charges
      .create({
        amount: request.body.amount,
        currency: request.body.currency,
        source: request.body.token,
      })
      .then(charge => {
        // asynchronously called
        response.send(charge);
      })
      .catch(err => {
        console.log(err);
      });
  },
);
