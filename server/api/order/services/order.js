"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/services.html#core-services)
 * to customize this service
 */

function items_calcCost(dishes) {
  // figure price of dishes
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const total =
    dishes && dishes.length > 0
      ? dishes.map((dish) => dish.price * dish.quantity).reduce(reducer)
      : 0;

  // calc in cents for stripe (x100 to get dollars)
  return total * 100;
}

module.exports = {
  items_calcCost,
};
