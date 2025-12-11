

# **GreenSky – Simple Country & Weather Information System**

GreenSky is a simple web system that shows country and weather information using public APIs.
The system also sends the weather data to a backend server and saves it in MongoDB.
This project was created for the **Service-Oriented Computing Mini Project** at Horizon Campus.

---

## **📌 Features**

* Search weather by city
* Shows temperature, humidity, wind, and forecast
* Sunrise and sunset times
* User login (JWT)
* Saves weather data to the database
* View saved records in a records page
* API Key + JWT security
* Clean and modern UI

---

## **🛠 Technologies Used**

### **Frontend**

* HTML
* CSS
* JavaScript (Fetch / AJAX)

### **Backend**

* Node.js
* Express.js
* MongoDB (Mongoose)
* JSON Web Token (JWT)
* API Key Authentication

### **Public APIs**

* **Open-Meteo Geocoding API**
* **Open-Meteo Weather Forecast API**

---

## **📂 Project Structure**

```
smart-country-weather/
│
├── greensky-dashboard.html      → Weather dashboard
├── login.html                   → Login page
├── records.html                 → Saved records page
│
├── backend/
│   ├── server.js                → Backend server
│   ├── models/Weather.js        → Weather model
│   ├── routes/                  → Auth & record routes
│   ├── middleware/              → JWT and API key middleware
│   ├── package.json
│   └── .env (not uploaded)
│
└── README.md
```

---

## **🚀 How to Run the Project**

### **1. Clone the Repository**

```
git clone https://github.com/Avishkawithanage/smart-country-weather
cd smart-country-weather
```

---

### **2. Start the Backend**

```
cd backend
npm install
npm run dev
```

Backend runs on:
👉 **[http://localhost:5000](http://localhost:5000)**

---

### **3. Create the `.env` File**

Inside the backend folder, create:

```
PORT=5000
MONGO_URI=your_mongodb_connection
API_KEY=your_api_key
JWT_SECRET=your_jwt_secret

AUTH_USERNAME=your_username
AUTH_PASSWORD=your_password
```

⚠ **Do not upload `.env` to GitHub.**

---

### **4. Start the Frontend**

Open these files in your browser:

* `login.html`
* `greensky-dashboard.html`
* `records.html`

---

## **📡 Backend API Endpoints**

### **POST /login**

Returns:

* JWT token
* API key

### **POST /submit**

Saves weather data.
Requires:

* `x-api-key`
* `Authorization: Bearer <token>`

### **GET /records**

Returns weather records for the logged-in user.

---

## **🗄 Sample MongoDB Document**

```json
{
  "city": "Colombo",
  "temperature": 30,
  "humidity": 74,
  "wind": 4.5,
  "latitude": 6.90,
  "longitude": 79.95,
  "timestamp": "2025-01-01T12:00:00Z",
  "userId": "avii"
}
```


## **👨‍🎓 Student Information**

**Name:** W. Thilan Avishka
**ID:** ITBNM-2211-0199
**Course:** BIT (Hons) Networking & Mobile Computing
**Module:** Service-Oriented Computing


