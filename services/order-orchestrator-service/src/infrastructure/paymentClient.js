const axios = require("axios");
require("dotenv").config();

async function processPayment(data) {
  const response = await axios.post(
    process.env.PAYMENT_SERVICE_URL,
    data,
    { timeout: 10000 }
  );

  return response.data;
}

module.exports = {
  processPayment
};