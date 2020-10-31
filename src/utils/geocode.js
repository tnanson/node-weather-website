const request = require('postman-request');

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibnRpbnRlY2htIiwiYSI6ImNrZ2pia3ZkczBlcm0zMnBpZXp1aDl5OXgifQ.hjA4oEVLeLMTMcT_AIe8dQ&limit=1`;

  request({ url, json: true }, (error, { body: { features } = {} }) => {
    if (error) {
      callback('Geocoding service unavailable');
    } else if (features.length === 0) {
      callback('No matching results found');
    } else {
      const [longitude, latitude] = features[0].center;
      const location = features[0].place_name;
      callback(undefined, { longitude, latitude, location });
    }
  });
};

module.exports = geoCode;
