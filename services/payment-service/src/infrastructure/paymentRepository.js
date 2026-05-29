const db = require("./database");

async function create(payment) {
  const [result] = await db.query(
    `
    INSERT INTO payments
    (
      user_id,
      order_id,
      amount,
      method,
      status,
      transaction_id
    )
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      payment.userId,
      payment.orderId,
      payment.amount,
      payment.method,
      payment.status,
      payment.transactionId
    ]
  );

  return result.insertId;
}

module.exports = {
  create
};