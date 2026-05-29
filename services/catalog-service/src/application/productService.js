const productRepository = require("../infrastructure/productRepository");

async function getProducts() {
  return await productRepository.findAll();
}

async function getProductById(id) {
  if (!id || Number.isNaN(Number(id))) {
    throw new Error("Identificador de producto no válido");
  }

  const product = await productRepository.findById(Number(id));

  if (!product) {
    const error = new Error("Producto no encontrado");
    error.statusCode = 404;
    throw error;
  }

  return product;
}

async function getProductByName(name) {
  if (!name) {
    throw new Error("Nombre de producto requerido");
  }

  const product = await productRepository.findByName(name);

  if (!product) {
    const error = new Error("Producto no encontrado");
    error.statusCode = 404;
    throw error;
  }

  return product;
}

module.exports = {
  getProducts,
  getProductById,
  getProductByName
};