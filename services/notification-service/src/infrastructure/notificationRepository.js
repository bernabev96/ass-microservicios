const db = require("./database");

async function create(notification) {
  const [result] = await db.query(
    `
    INSERT INTO notifications
    (
      user_id,
      order_id,
      type,
      message,
      status
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      notification.userId,
      notification.orderId,
      notification.type,
      notification.message,
      notification.status
    ]
  );

  return result.insertId;
}

async function findByUser(userId) {
  const [rows] = await db.query(
    `
    SELECT *
    FROM notifications
    WHERE user_id = ?
    ORDER BY created_at DESC
    `,
    [userId]
  );

  return rows;
}

async function findByOrder(orderId) {
  const [rows] = await db.query(
    `
    SELECT *
    FROM notifications
    WHERE order_id = ?
    ORDER BY created_at DESC
    `,
    [orderId]
  );

  return rows;
}

module.exports = {
  create,
  findByUser,
  findByOrder
};