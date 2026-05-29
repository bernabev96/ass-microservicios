const { comprobarStock } = require("../infrastructure/soap/almacenClient");
const proveedor1 = require("../infrastructure/soap/proveedor1Client");
const proveedor2 = require("../infrastructure/soap/proveedor2Client");
const paymentClient = require("../infrastructure/paymentClient");
const notificationClient = require("../infrastructure/notificationClient");

function addDays(days) {
  const date = new Date();
  date.setDate(
    date.getDate() + days
  );
  return date.toISOString().split("T")[0];
}

async function procesarPedido(data) {
  const {
    userId,
    orderId,
    product,
    totalPrice,
    paymentData
  } = data;

  if (!userId || !orderId || !product || !totalPrice || !paymentData) {
    throw new Error("Datos insuficientes para procesar pedido");
  }

  const hayStock = await comprobarStock(product);
  const paymentResult = await paymentClient.processPayment({
    userId,
    orderId,
    amount: totalPrice,
    method: "credit_card",
    ...paymentData
  });

  if (hayStock) {
    const estimatedDeliveryDate = addDays(2);

    await notificationClient.sendNotification({
      userId,
      orderId,
      type: "PEDIDO_CONFIRMADO",
      message:
        `Su pedido de ${product} ha sido confirmado. ` +
        `Fecha estimada de entrega: ${estimatedDeliveryDate}`
    });

    return {
      status: "CONFIRMED",
      paymentStatus: paymentResult.status,
      estimatedDeliveryDate,
      message: "Producto disponible en almacén y pago aprobado"
    };
  }

  const precio1 = await proveedor1.solicitarPresupuesto(product);
  const precio2 = await proveedor2.solicitarPresupuesto(product);

  let proveedorSeleccionado;
  let supplier;
  let supplierPrice;

  if (precio1 <= precio2) {
    proveedorSeleccionado = proveedor1;
    supplier = "Proveedor1";
    supplierPrice = precio1;
  } else {
    proveedorSeleccionado = proveedor2;
    supplier = "Proveedor2";
    supplierPrice = precio2;
  }

  const supplierMessage = await proveedorSeleccionado.ordenarCompra(product);
  const estimatedDeliveryDate = addDays(7);

  await notificationClient.sendNotification({
    userId,
    orderId,
    type: "PEDIDO_PROVEEDOR",
    message:
      `Su pedido de ${product} ha sido solicitado al proveedor. ` +
      `Fecha estimada de entrega: ${estimatedDeliveryDate}`
  });

  return {
    status: "ORDERED_TO_SUPPLIER",
    paymentStatus: paymentResult.status,
    supplier,
    supplierPrice,
    estimatedDeliveryDate,
    message: supplierMessage
  };
}

module.exports = {
  procesarPedido
};