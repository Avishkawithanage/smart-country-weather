GreenSky – Weather Dashboard System

A simple web system that shows real-time weather information using two public APIs.
The system also sends the weather data to a backend server and saves it in MongoDB.

This project was created for the Service-Oriented Computing Mini Project.

📌 Features

Search weather by city

Shows temperature, wind, humidity, sunrise/sunset

Hourly and tomorrow forecast

User login (JWT)

Saves weather data to database

Records page to view saved data

API Key + JWT security

Clean and modern dashboard UI

🛠 Technologies Used
Frontend

HTML

CSS

JavaScript (Fetch / AJAX)

Backend

Node.js

Express.js

MongoDB (Mongoose)

JSON Web Token (JWT)

API Key authentication

Public APIs

The project uses two Open-Meteo APIs:

Geocoding API – Converts city name to coordinates

Weather Forecast API – Gives real-time weather data

📂 Project Structure
📁 frontend
 ├── login.html
 ├── greensky-dashboard.html
 ├── records.html

📁 backend
 ├── server.js
 ├── models/
 │    └── Weather.js
 ├── routes/
 ├── middleware/
 ├── package.json
 └── .env

🚀 How to Run the Project
1. Clone the repository
git clone https://github.com/your-username/greensky-weather.git
cd greensky-weather

2. Start the Backend
cd backend
npm install
npm run dev


Backend will run on:
👉 http://localhost:5000

Make sure your .env file is added (not uploaded to GitHub).

3. Start the Frontend

Open the HTML files directly in a browser:

login.html

greensky-dashboard.html

records.html

🔑 Environment Variables

Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_url
API_KEY=your_api_key
JWT_SECRET=your_jwt_secret

AUTH_USERNAME=your_username
AUTH_PASSWORD=your_password


Do NOT upload .env to GitHub.

🔐 Authentication Flow

User logs in → Backend returns JWT + API Key

Dashboard sends weather data → /submit

Backend stores data in MongoDB

Records page → /records → shows saved data

Both /submit and /records need:

x-api-key

Authorization: Bearer <token>

📡 API Endpoints
POST /login

Returns JWT + API Key.

POST /submit

Saves weather data to MongoDB.

GET /records

Returns saved weather history for logged-in user.

🗄 MongoDB Document Format
{
  "city": "Colombo",
  "temperature": 30,
  "humidity": 74,
  "wind": 4.5,
  "latitude": 6.90,
  "longitude": 79.95,
  "timestamp": "2025-01-01T12:00:00Z",
  "userId": "user123"
}

📸 Screenshots

(Add your screenshots here)

Login Page

Weather Dashboard

Records Page

⚠ Notes

Keep .env private

Open-Meteo APIs do not need API keys

Works fully offline with your local backend

Ready for deployment (Render / Railway + Netlify/GitHub Pages)

👨‍🎓 Student Information

Project for Service-Oriented Computing (IT41073)
Student: W. Thilan Avishka – ITBNM-2211-0199# smart-country-weather
