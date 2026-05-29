const db = require("./database");

async function create(user) {
  const [result] = await db.query(
    `
    INSERT INTO users
    (name, email, password_hash, role)
    VALUES (?, ?, ?, ?)
    `,
    [
      user.name,
      user.email,
      user.passwordHash,
      user.role
    ]
  );

  return result.insertId;
}

async function findByEmail(email) {
  const [rows] = await db.query(
    `
    SELECT *
    FROM users
    WHERE email = ?
    `,
    [email]
  );

  return rows[0] || null;
}

async function findById(id) {
  const [rows] = await db.query(
    `
    SELECT id, name, email, role, created_at
    FROM users
    WHERE id = ?
    `,
    [id]
  );

  return rows[0] || null;
}

module.exports = {
  create,
  findByEmail,
  findById
};