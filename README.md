# 🛎️ Notification Service (Backend)

This is a backend service to send and manage notifications to users via Email, SMS, or In-App messages. 

## 🚀 Features

- ✅ Send notifications to users
- ✅ Support for Email, SMS, and In-App notifications
- ✅ Queue-based processing using Redis
- ✅ Retry mechanism for failed notifications
- ✅ MongoDB for persistent storage
- ✅ Clean and modular architecture

---

## ⚙️ Technologies Used

- Node.js + Express
- MongoDB (with Mongoose)
- Redis (with Bull for queues)
- dotenv
- Postman (for API testing)

---

## 🛠️ Setup Instructions

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/sraj5252/notification-service.git
cd notification-service
```
### 2. Install Dependencies

```bash
npm install
```
### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/notificationDB
REDIS_URL=redis://localhost:6379
```

### 4. Start Mongo

Make sure both services are running:

- **MongoDB**:
  ```bash
  mongoose
  ```

- **Redis** (using WSL):
  ```bash
  redis-server
  ```
    
### 5. Start the Application

```bash
node app.js
```

Visit `http://localhost:5000` to verify the server is running.

---

## 📮 API Endpoints

### ➤ Send Notification

**POST** `/notifications`

Request Body:
```json
{
  "userId": "123",
  "type": "email", // or "sms", "in-app"
  "message": "Hello, welcome to our platform!"
}
```

### ➤ Get Notifications for a User

**GET** `/users/:id/notifications`

Example:
```
GET /users/123/notifications
```

Response:
```json
[
  {
    "type": "email",
    "message": "Hello, welcome to our platform!",
    "status": "sent",
    "timestamp": "2025-05-17T12:00:00Z"
  }
]
```

---

## 📁 Project Structure

```
notification-service/
├── app.js
├── .env
├── README.md
├── config/
│   └── db.js
├── controllers/
│   └── notificationController.js
├── models/
│   └── Notification.js
├── routes/
│   └── notificationRoutes.js
├── queues/
│   └── notificationQueue.js
```


---

## 📝 Assumptions

- Notification delivery (email/SMS/in-app) is mocked.
- MongoDB and Redis are assumed to be running locally.
- No third-party APIs are integrated.
- Retry logic and queue error handling are handled within the service.

---

## 📬 Contact

For questions or feedback, contact **sraj80525@gmail.com**
