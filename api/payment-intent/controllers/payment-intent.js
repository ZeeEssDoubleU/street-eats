"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

// TODO: look into adding paymentIntent to db
//    -  add id, items
//       -  only add if user logged in (only way to track)
//    - update if cart changes
//    - delete if purchase made

// ! load stripe api key and initiate stripe connection
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// ***********
// controller
// ***********

async function retrieve(ctx) {
  const { paymentIntent_id, items } = ctx.request.body;
  // console.log("ctx.request.body:", ctx.request.body); // ? debug

  const total = strapi.services.order.items_calcCost(items);

  try {
    // retrieve payment intent
    let paymentIntent = await stripe.paymentIntents.retrieve(paymentIntent_id);
    console.log("retrieving payment intent...");

    // if current cart $ total differs from retrieved $ amount, update payment intent
    if (paymentIntent.amount !== total) {
      paymentIntent = await stripe.paymentIntents.update(paymentIntent_id, {
        amount: total,
      });
      console.log("updating payment intent...");
    }

    return {
      id: paymentIntent.id,
      client_secret: paymentIntent.client_secret,
    };
  } catch (error) {
    console.error(error);
  }
}

// ***********
// controller
// ***********

async function create(ctx) {
  const items = ctx.request.body;
  // console.log("ctx.request.body:", ctx.request.body); // ? debug

  const total = strapi.services.order.items_calcCost(items);

  try {
    // create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      // Verify your integration in this guide by including this parameter
      metadata: {
        integration_check: "accept_a_payment",
      },
    });
    console.log("creating payment intent...");

    return {
      id: paymentIntent.id,
      client_secret: paymentIntent.client_secret,
    };
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  create,
  retrieve,
};
