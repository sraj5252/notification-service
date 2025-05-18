const { Queue, Worker } = require('bullmq');
const Redis = require('ioredis');
const Notification = require('../models/Notification');

const connection = new Redis({
  host: '127.0.0.1',
  port: 6379,
  maxRetriesPerRequest: null, 
});

const notificationQueue = new Queue('notifications', { connection });

const worker = new Worker(
  'notifications',
  async job => {
    const { id } = job.data;
    const notification = await Notification.findById(id);
    if (!notification) return;

    try {
        if (notification.type === 'email') {
            console.log(`Sending EMAIL to user ${notification.userId}: ${notification.message}`);
          } else if (notification.type === 'sms') {
            console.log(`Sending SMS to user ${notification.userId}: ${notification.message}`);
          } else if (notification.type === 'in-app') {
            console.log(`Storing IN-APP notification for user ${notification.userId}: ${notification.message}`);
          } else {
            console.log(`Unknown notification type for user ${notification.userId}: ${notification.message}`);
          }          
      notification.status = 'sent';
      await notification.save();
    } catch (err) {
      notification.status = 'failed';
      await notification.save();
    }
  },
  { connection }
);

module.exports = { notificationQueue };
