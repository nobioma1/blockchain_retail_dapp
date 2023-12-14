// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async function (params, context) {
  const { email, amount, currency, paymentMethodType } = params;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    context.status(200);
    return {
      client_secret: paymentIntent.client_secret,
    };
  } catch (e) {
    context.status(500);
    console.log(e);
    return {
      message: e.message,
    };
  }
};
