# Weather Dashboard

### Project Description
The **Weather Dashboard** is a web application that allows users to search for weather forecasts by city. It retrieves **real-time weather data** using the OpenWeather API and displays both **current conditions** and a **5-day forecast**. The application also keeps track of search history, allowing users to quickly revisit previous searches.

## Features
- Search for **real-time weather data** by city
- View **current weather conditions** (temperature, humidity, wind speed, etc.)
- Display a **5-day weather forecast**
- **Save search history** for easy access
- Fetch weather data using the **OpenWeather API**
- Responsive and **user-friendly interface**

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **API:** OpenWeather API
- **Data Storage:** JSON file (`searchHistory.json`)
- **Hosting:** Render

## Project Structure
```
weather-dashboard/
│── client/                  # Frontend Code
│   ├── src/
│   │   ├── css/
│   │   ├── js/
│   │   │   ├── script.js      # Front-end logic
│   ├── index.html             # Main UI
│── server/                   # Backend Code
│   ├── db/                    # Database-related files
│   ├── src/
│   │   ├── routes/            # API route handlers
│   │   ├── services/          # Business logic and API services
│   ├── server.js              # Express server
│   ├── searchHistory.json     # Store search history
│   ├── .env                   # Store API key
│   ├── package.json           # Dependencies
│   ├── README.md              # Documentation
```

## Deployment
- Hosted on **Render**
- **Live URL:** _[insert link]_

