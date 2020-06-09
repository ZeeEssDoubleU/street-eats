"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const keys = require("../../../../config/keys");
const { sanitizeEntity } = require("strapi-utils");
const stripe = require("stripe")(keys.STRIPE_SECRET);

module.exports = {
  async paymentIntent_create(ctx) {
    const { items } = ctx.req.body;

    console.log("CONTEXT", ctx.req.body);
    console.log("ITEMS", items);

    // charge the customer
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 50 * 100, // calculated in cents (x100 to get dollars)
        currency: "usd",
        // Verify your integration in this guide by including this parameter
        metadata: { integration_check: "accept_a_payment" },
      });

      return { client_secret: paymentIntent.client_secret };
    } catch (error) {
      console.error(error);
    }
  },
};
