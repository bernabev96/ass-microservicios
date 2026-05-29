const { v4: uuidv4 } = require("uuid");

const bankRepository = require("../infrastructure/bankRepository");
const paymentRepository = require("../infrastructure/paymentRepository");

function validateCardData(cardNumber, cvv, expiryMonth, expiryYear) {
  if (!/^\d{16}$/.test(cardNumber)) {
    throw new Error("Número de tarjeta inválido");
  }

  if (!/^\d{3}$/.test(cvv)) {
    throw new Error("CVV inválido");
  }

  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  if (
    expiryYear < currentYear ||
    (expiryYear === currentYear && expiryMonth < currentMonth)
  ) {
    throw new Error("Tarjeta caducada");
  }
}

async function processPayment(data) {
  const {
    userId,
    orderId,
    amount,
    method,
    cardNumber,
    cvv,
    expiryMonth,
    expiryYear
  } = data;

  if (!orderId || !amount || !method) {
    throw new Error("Datos de pago incompletos");
  }

  validateCardData(
    cardNumber,
    cvv,
    expiryMonth,
    expiryYear
  );

  const card = await bankRepository.findCard(
    cardNumber,
    cvv
  );

  if (!card) {
    throw new Error("Tarjeta no encontrada");
  }

  if (!card.active) {
    throw new Error("Tarjeta desactivada");
  }

  if (Number(card.balance) < Number(amount)) {
    throw new Error("Saldo insuficiente");
  }

  const newBalance =
    Number(card.balance) - Number(amount);

  await bankRepository.updateBalance(
    card.id,
    newBalance
  );

  const payment = {
    userId,
    orderId,
    amount,
    method,
    status: "approved",
    transactionId: uuidv4()
  };

  const paymentId =
    await paymentRepository.create(payment);

  return {
    paymentId,
    status: payment.status,
    transactionId: payment.transactionId,
    remainingBalance: newBalance
  };
}

module.exports = {
  processPayment
};