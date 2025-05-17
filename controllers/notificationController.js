const Notification = require('../models/Notification');
const { notificationQueue } = require('../queues/notificationQueue');

const sendNotification = async (req, res) => {
  const { userId, type, message } = req.body;
  try {
    const notification = await Notification.create({ userId, type, message });
    await notificationQueue.add('send', { id: notification._id });
    res.status(201).json({ success: true, notification });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.id });
    res.json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { sendNotification, getUserNotifications };
