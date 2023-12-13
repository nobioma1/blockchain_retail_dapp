// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const data = require('./data');

module.exports = async function (params, context) {
  return {
    products: data,
  };
};
