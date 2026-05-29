const orderRepository = require("../infrastructure/orderRepository");
const catalogClient = require("../infrastructure/clients/catalogClient");
const orchestratorClient = require("../infrastructure/clients/orchestratorClient");

async function createOrder(data, userId) {
  const {
    product,
    quantity,
    paymentData
  } = data;

  if (!product || !quantity || quantity <= 0) {
    throw new Error("Datos de pedido inválidos");
  }

  if (!paymentData) {
    throw new Error("Datos de pago requeridos");
  }

  const productData = await catalogClient.getProductByName(product);

  const totalPrice = Number(productData.price) * Number(quantity);

  const orderId = await orderRepository.create({
    userId,
    productName: product,
    quantity,
    totalPrice,
    status: "PENDING"
  });

  const orchestrationResult = await orchestratorClient.processOrder({
    userId,
    orderId,
    product,
    quantity,
    totalPrice,
    paymentData
  });

  await orderRepository.updateResult(orderId, orchestrationResult);

  return {
    orderId,
    product,
    quantity,
    totalPrice,
    ...orchestrationResult
  };
}

async function getOrders(userId) {
  return await orderRepository.findAllByUser(userId);
}

module.exports = {
  createOrder,
  getOrders
};