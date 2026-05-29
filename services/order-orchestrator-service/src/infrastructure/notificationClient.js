const axios = require("axios");
require("dotenv").config();

async function sendNotification(data) {
  const response = await axios.post(
    process.env.NOTIFICATION_SERVICE_URL,
    data,
    { timeout: 5000 }
  );

  return response.data;
}

module.exports = {
  sendNotification
};