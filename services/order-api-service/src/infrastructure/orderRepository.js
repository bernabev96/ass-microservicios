const db = require("./database");

async function create(order) {
  const [result] = await db.query(
    `
    INSERT INTO orders
    (
      user_id,
      product_name,
      quantity,
      total_price,
      status
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      order.userId,
      order.productName,
      order.quantity,
      order.totalPrice,
      order.status
    ]
  );

  return result.insertId;
}

async function updateResult(orderId, result) {
  await db.query(
    `
    UPDATE orders
    SET status = ?,
        payment_status = ?,
        supplier = ?,
        supplier_price = ?,
        estimated_delivery_date = ?
    WHERE id = ?
    `,
    [
      result.status,
      result.paymentStatus || null,
      result.supplier || null,
      result.supplierPrice || null,
      result.estimatedDeliveryDate || null,
      orderId
    ]
  );
}

async function findAllByUser(userId) {
  const [rows] = await db.query(
    `
    SELECT *
    FROM orders
    WHERE user_id = ?
    ORDER BY id DESC
    `,
    [userId]
  );

  return rows;
}

module.exports = {
  create,
  updateResult,
  findAllByUser
};