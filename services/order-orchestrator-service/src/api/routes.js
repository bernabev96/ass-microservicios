const express = require("express");

const router = express.Router();

const { procesarPedido } = require("../application/procesarPedido");

router.get("/health", (req, res) => {
  res.json({
    service: "order-orchestrator-service",
    status: "UP"
  });
});

router.post("/pedido", async (req, res) => {
  try {
    const result = await procesarPedido(req.body);
    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;