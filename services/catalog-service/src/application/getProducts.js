const repository = require("../infrastructure/productRepository");

async function getProducts() {
  return await repository.getAllProducts();
}

module.exports = { getProducts };