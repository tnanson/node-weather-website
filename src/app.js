const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Nans',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Nans',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'Contact us by Email/Phone',
    title: 'Help',
    name: 'Nans',
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Help article not found',
    name: 'Nans',
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: 'You must provide an address!',
    });
  }
  geocode(address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        res.send({
          error,
        });
      }
      res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page not found',
    name: 'Nans',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
