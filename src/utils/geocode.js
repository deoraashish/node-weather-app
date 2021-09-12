const request = require('request');

const geocode = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoiYXNoMjQ4Y29vbCIsImEiOiJjanoyb204cjgwN3pnM2NtbXozYTY3NnQ2In0.xiBUgFv4AQdgvYkCdOBcmg&limit=1&lang=en';

    request({url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect geocoding service', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to get geo code for the location', undefined);
        } 
        else {
            const data = body;
            callback(undefined, {
                longitude: data.features[0].center[0],
                latitude: data.features[0].center[1],
                place: data.features[0].place_name
            });
        }
    });
};

module.exports = geocode;