const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();
const path = require('path');
const favicon = require('serve-favicon');
const fetch = require('node-fetch');

/* CORS */
const isProduction = process.env.NODE_ENV === 'production';
const origin = {
  origin: isProduction ? 'https://react-app-ravenous.herokuapp.com/' : 'http://localhost:5000/',
};

/* Middlewares */
app.use(compression());
app.use(cors(origin));
app.use(helmet.hsts());
app.use(helmet.expectCt());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy()); // only for Express
app.use(helmet.xssFilter());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* PORT - 5000 default for localhost */
const PORT = process.env.PORT || 5000;

// static files
if (isProduction) {
  // production
  app.use(express.static(path.join(__dirname, 'build')));
  app.use(favicon(path.join(__dirname, '/build/favicon.ico')));
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
} else {
  // development
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

/* Route to get data from Quotes.rest API */
app.get('/quote', (req, res) => {
  const uri = `https://quotes.rest/qod`;
  const options = {
    method: 'GET'
  }

  fetch(uri, options)
    .then(response => response.json())
    .then(jsonData => res.status(200).json(jsonData))
    .catch(err => res.status(400).json({ err: err }));
});

/* Route to get data from OpenWeather API */
app.get('/weather', (req, res) => {
  const { lat, lon } = req.query;
  const uri = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}&units=metric`;
  const options = {
    method: 'GET'
  };
  
  // Get the icon image
  // http://openweathermap.org/img/wn/{ICON CODE}@2x.png

  fetch(uri, options)
    .then(response => response.json())
    .then(jsonData => res.status(200).json(jsonData))
    .catch(err => res.status(400).json({ err: err }));
});

/* Route to get data from Unsplash API */
app.get('/images', (req, res) => {
  const uri = 'https://api.unsplash.com/photos/random?count=5&query=nature';
  const options = {
    method: 'GET',
    headers: { Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}` }
  };

  fetch(uri, options)
    .then(response => response.json())
    .then(jsonData => res.status(200).json(jsonData))
    .catch(err => res.status(400).json({ err: err }));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listen at port: ${PORT}`);
})