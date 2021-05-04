"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

// ***********
// controller
// ***********

async function create(ctx) {
  const { user, paymentInfo, transaction_id, cart } = ctx.request.body;
  // console.log("paymentInfo - create order:", paymentInfo); // ? debug

  const { id: user_id, username } = user;
  const { email, name, address, city, state, postal_code } = paymentInfo;
  const { id: restaurant_id, items: dishes } = cart;

  // calc cost of items
  const total = strapi.services.order.items_calcCost(dishes);

  // console.log("user:", user); // ? debug
  // console.log("paymentInfo:", paymentInfo); // ? debug
  // console.log("cart:", cart); // ? debug
  // console.log("total:", total); // ? debug

  try {
    const entity = await strapi.services.order.create({
      name,
      address,
      city,
      state,
      postal_code,
      dishes,
      total,
      transaction_id,
      user: user_id,
      email,
      restaurant: restaurant_id,
    });

    // console.log("entity:", entity); // ? debug
    // console.log("restaurant.image:", entity.restaurant.image); // ? debug

    // *** format properties to minimze payload returned to client
    const user_format = {
      username: entity.user.username,
      email: entity.user.email,
    };
    const restaurant_format = {
      id: entity.restaurant.id,
      name: entity.restaurant.name,
      phone: entity.restaurant.phone,
    };
    entity.user = user_format;
    entity.restaurant = restaurant_format;

    return sanitizeEntity(entity, { model: strapi.models.order });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  create,
};
