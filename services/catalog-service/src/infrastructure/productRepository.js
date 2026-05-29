const db = require("./database");

async function findAll() {
  const [rows] = await db.query(
    "SELECT id, name, price, created_at FROM products ORDER BY id"
  );

  return rows;
}

async function findById(id) {
  const [rows] = await db.query(
    "SELECT id, name, price, created_at FROM products WHERE id = ?",
    [id]
  );

  return rows[0] || null;
}

async function findByName(name) {
  const [rows] = await db.query(
    "SELECT id, name, price, created_at FROM products WHERE name = ?",
    [name]
  );

  return rows[0] || null;
}

module.exports = {
  findAll,
  findById,
  findByName
};