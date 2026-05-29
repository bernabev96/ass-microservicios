const express = require("express");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

const {
  createOrder,
  getOrders
} = require("../application/orderService");

router.get("/health", (req, res) => {
  res.json({
    service: "order-api-service",
    status: "UP"
  });
});

router.get("/orders", authenticateToken, async (req, res) => {
    try {
      const orders = await getOrders(
        req.user.id
      );

      res.json(orders);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Error obteniendo pedidos"
      });
    }
  }
);

router.post("/orders", authenticateToken, async (req, res) => {
  try {
    const result =
      await createOrder(req.body, req.user.id);

    res.status(201).json(result);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      error: error.message
    });
  }
});

module.exports = router;