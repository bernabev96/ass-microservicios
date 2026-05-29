const axios = require("axios");
require("dotenv").config();

const catalogClient = axios.create({
  baseURL: process.env.CATALOG_SERVICE_URL,
  timeout: 5000
});

async function getProductByName(product) {
  const response = await catalogClient.get(`/products/name/${product}`);
  return response.data;
}

module.exports = {
  getProductByName
};