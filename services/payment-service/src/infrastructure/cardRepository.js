const db = require("./database");

async function findCard(cardNumber) {
  const [rows] = await db.query(
    `
    SELECT *
    FROM bank_cards
    WHERE card_number = ?
    `,
    [cardNumber]
  );

  return rows[0];
}

async function updateBalance(cardNumber, newBalance) {
  await db.query(
    `
    UPDATE bank_cards
    SET balance = ?
    WHERE card_number = ?
    `,
    [newBalance, cardNumber]
  );
}

module.exports = {
  findCard,
  updateBalance
};