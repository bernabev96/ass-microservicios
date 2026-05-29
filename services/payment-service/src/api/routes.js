const express = require("express");

const router = express.Router();

const {
  processPayment
} = require("../application/paymentService");

router.get("/health", (req, res) => {
  res.json({
    service: "payment-service",
    status: "UP"
  });
});

router.post("/payments", async (req, res) => {
  try {
    const result =
      await processPayment(req.body);

    res.status(201).json(result);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      error: error.message
    });
  }
});

module.exports = router;