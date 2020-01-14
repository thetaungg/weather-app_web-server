const request = require('request');


const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/76d72d3437935450e7357537b57fbcea/${latitude},${longitude}?units=si`;

  request({url: url, json: true}, (error, {body}) => {
      if(error) {
          callback('Unable to connect to the weather services')
      }else if (body.error) {
          callback('Unable to find the weather info for inserted location')
      }else {
          callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees in ${body.timezone}. And there is ${body.currently.precipProbability}% chance of rain`);
      }
  })
};

module.exports = forecast;