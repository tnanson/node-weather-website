const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=12ff5dc161fe5e2d377b4520976226cf&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service');
    } else if (body.error) {
      callback('Unable to find location');
    } else {
      const {
        temperature,
        precip,
        weather_descriptions,
        humidity,
        feelslike,
      } = body.current;
      callback(
        undefined,
        `${weather_descriptions[0]}. It is currently ${temperature} degrees and it feels like ${feelslike} degrees. There is ${precip}% chance of rain. Humidity is ${humidity}%.`
      );
    }
  });
};

module.exports = forecast;
