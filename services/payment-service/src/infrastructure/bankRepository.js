const db = require("./database");

async function findCard(cardNumber, cvv) {
  const [rows] = await db.query(
    `
    SELECT *
    FROM bank_cards
    WHERE card_number = ?
    AND cvv = ?
    `,
    [cardNumber, cvv]
  );

  return rows[0] || null;
}

async function updateBalance(cardId, newBalance) {
  await db.query(
    `
    UPDATE bank_cards
    SET balance = ?
    WHERE id = ?
    `,
    [newBalance, cardId]
  );
}

module.exports = {
  findCard,
  updateBalance
};