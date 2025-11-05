const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

// 1. QUOTE GENERATOR ENDPOINT
const quotes = [
  "Believe you can and you're halfway there.",
  "Every day is a second chance.",
  "Push yourself, because no one else is going to do it for you.",
  // Add more quotes if you like!
];

app.get('/api/quote', (req, res) => {
  // Select a random quote from the array
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ quote: randomQuote });
});

// 2. WEATHER ENDPOINT
// Requires OpenWeatherMap API Key (store in .env as OPENWEATHER_API_KEY)
app.get('/api/weather', async (req, res) => {
  try {
    // Change 'London' to any city you want
    const city = 'London';
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const response = await axios.get(url);
    const data = response.data;
    // Simplify the response
    res.json({
      temperature: data.main.temp,
      condition: data.weather[0].description
    });
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch weather data.' });
  }
});

// 3. CURRENCY CONVERTER ENDPOINT
// Uses open source exchange rate API (no key needed)
app.get('/api/currency', async (req, res) => {
  try {
    const amount = parseFloat(req.query.amount) || 0;
    const url = 'https://open.er-api.com/v6/latest/INR';
    const response = await axios.get(url);
    const rates = response.data.rates;
    // Calculate and return the currency conversions
    res.json({
      usd: (amount * rates.USD).toFixed(2),
      eur: (amount * rates.EUR).toFixed(2)
    });
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch currency data.' });
  }
});

// (Optional) Home route
app.get('/', (req, res) => {
  res.send('Express server is running!');
});

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

