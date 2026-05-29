const axios = require("axios");
require("dotenv").config();
    
const orchestratorClient = axios.create({
  baseURL: process.env.ORCHESTRATOR_SERVICE_URL,
  timeout: 10000
});

async function processOrder(data) {
  const response = await orchestratorClient.post("/", data);
  return response.data;
}

module.exports = {
  processOrder
};