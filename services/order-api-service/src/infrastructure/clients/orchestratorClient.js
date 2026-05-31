const axios = require("axios");
require("dotenv").config();
    
const orchestratorClient = axios.create({
  baseURL: process.env.ORCHESTRATOR_SERVICE_URL,
  timeout: 10000
});

async function processOrder(data) {
  try {
    const response = await orchestratorClient.post("/", data);
    return response.data;
  } catch (error) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }

    throw error;
  }
}

module.exports = {
  processOrder
};
