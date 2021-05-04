"use strict";
const slugify = require("slugify");

module.exports = {
  lifecycles: {
    beforeCreate(data) {
      data.slug = slugify(data.name, { lower: true });
    },
    beforeUpdate(params, data) {
      data.slug = slugify(data.name, { lower: true });
    },
  },
};
