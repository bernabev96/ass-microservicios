const soap = require("soap");
require("dotenv").config();

const URL = process.env.SOAP_PROVEEDOR1_URL;

async function solicitarPresupuesto(producto) {
  const client = await soap.createClientAsync(URL);
  const [result] = await client.SolicitarPersupuestoAsync({ producto });
  return result.return;
}

async function ordenarCompra(producto) {
  const client = await soap.createClientAsync(URL);
  const [result] = await client.OrdenarCompraAsync({ producto });
  return result.return;
}

module.exports = { solicitarPresupuesto, ordenarCompra };