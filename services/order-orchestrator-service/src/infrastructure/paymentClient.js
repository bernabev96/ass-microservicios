const axios = require("axios");
require("dotenv").config();

async function processPayment(data) {
  try {
    const response = await axios.post(process.env.PAYMENT_SERVICE_URL, data, { timeout: 10000 });

    return response.data;
  } catch (error) {

    if (error.response) {
      throw new Error(
        error.response.data.error
      );
    }

    throw error;
  }
}

module.exports = {
  processPayment
};