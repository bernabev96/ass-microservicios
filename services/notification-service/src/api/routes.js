const express = require("express");
const { authenticateToken } = require("../middlewares/authMiddleware");
const router = express.Router();

const {
  createNotification,
  getNotificationsByUser,
  getNotificationsByOrder
} = require("../application/notificationService");

router.get("/health", (req, res) => {
  res.json({
    service: "notification-service",
    status: "UP"
  });
});

router.post("/notifications", async (req, res) => {
  try {
    const result = await createNotification(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      error: error.message
    });
  }
});

router.get("/notifications/me", authenticateToken, async (req, res) => {
  try {
    const notifications =
      await getNotificationsByUser(req.user.id);

    res.json(notifications);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error obteniendo notificaciones"
    });
  }
});

router.get("/notifications/order/:orderId", authenticateToken, async (req, res) => {
  try {
    const notifications =
      await getNotificationsByOrder(req.params.orderId);

    res.json(notifications);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error obteniendo notificaciones"
    });
  }
});

module.exports = router;