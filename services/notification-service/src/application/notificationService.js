const notificationRepository = require("../infrastructure/notificationRepository");

async function createNotification(data) {
  const {
    userId,
    orderId,
    type,
    message
  } = data;

  if (!userId || !orderId || !type || !message) {
    throw new Error("Datos de notificación incompletos");
  }

  const notification = {
    userId,
    orderId,
    type,
    message,
    status: "SENT"
  };

  const notificationId =
    await notificationRepository.create(notification);

  return {
    notificationId,
    ...notification
  };
}

async function getNotificationsByUser(userId) {
  return await notificationRepository.findByUser(userId);
}

async function getNotificationsByOrder(orderId) {
  return await notificationRepository.findByOrder(orderId);
}

module.exports = {
  createNotification,
  getNotificationsByUser,
  getNotificationsByOrder
};