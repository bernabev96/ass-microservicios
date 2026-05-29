const soap = require("soap");
require("dotenv").config();

const URL = process.env.SOAP_ALMACEN_URL;

async function comprobarStock(producto) {
  const client = await soap.createClientAsync(URL);
  const [result] = await client.ComprobarStockAsync({ producto });
  return result.return;
}

module.exports = { comprobarStock };