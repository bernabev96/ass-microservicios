const express = require("express");

const router = express.Router();

const {
  getProducts,
  getProductById,
  getProductByName
} = require("../application/productService");

router.get("/health", (req, res) => {
  res.json({
    service: "catalog-service",
    status: "UP"
  });
});

router.get("/products", async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error obteniendo productos"
    });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(error.statusCode || 500).json({
      error: error.message
    });
  }
});

router.get("/products/name/:name", async (req, res) => {
  try {
    const product = await getProductByName(req.params.name);
    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(error.statusCode || 500).json({
      error: error.message
    });
  }
});

module.exports = router;