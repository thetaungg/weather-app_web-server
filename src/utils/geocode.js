const request = require('request');


const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidGhldGF1bmc1MjEiLCJhIjoiY2s0bWhzZzN3MWI5MzNrbnNkZ3V4bGYxbCJ9.TWUuBfTRrz7z4rDvFNEMBg&limit=1`;

    request({url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the location services')
        }else if (body.features.length === 0) {
            callback('Unable to find location. Try again')
        }else {
            callback(undefined, { //error undefined
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
};

module.exports = geocode;