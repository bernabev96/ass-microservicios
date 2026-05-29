const express = require("express");

const router = express.Router();

const {
  register,
  login
} = require("../application/authService");

router.get("/health", (req, res) => {
  res.json({
    service: "auth-service",
    status: "UP"
  });
});

router.post("/auth/register", async (req, res) => {
  try {
    const result = await register(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      error: error.message
    });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const result = await login(req.body);
    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(401).json({
      error: error.message
    });
  }
});

module.exports = router;