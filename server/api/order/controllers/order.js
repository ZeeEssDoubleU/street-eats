"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

// *** load keys and initiate stripe connection
const keys = require("../../../../config/keys");
const stripe = require("stripe")(keys.STRIPE_SECRET);

// *** create payment intent
const paymentIntent_create = async (ctx) => {
  const dishes = ctx.request.body;
  console.log("DISHES:", dishes);

  // figure price of dishes
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const amount =
    dishes && dishes.map((dish) => dish.price * dish.quantity).reduce(reducer);

  try {
    // charge the customer
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // calculated in cents (x100 to get dollars)
      currency: "usd",
      // Verify your integration in this guide by including this parameter
      metadata: { integration_check: "accept_a_payment" },
    });

    // TODO: consider only returning client secret and id
    // return { client_secret: paymentIntent.client_secret };
    return paymentIntent;
  } catch (error) {
    console.error(error);
  }
};

// *** get payment intent
const paymentIntent_retrieve = async (ctx) => {
  const { paymentIntent_id } = ctx.request.body;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntent_id
    );

    // TODO: consider only returning client secret
    return paymentIntent;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  paymentIntent_create,
  paymentIntent_retrieve,
};
