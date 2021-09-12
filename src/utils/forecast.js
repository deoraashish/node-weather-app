const request = require('request');

const forecast = (long, lat, callback) => {
    const url = 'https://api.darksky.net/forecast/269610d95b01ef97652ff6c7d94dc340/'+lat+','+long;
    request({url: url, json: true}, (error, {body}) => {

        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find weather information', undefined);
        } 
        else {
            var data = body.currently;
            var temperature = data.temperature;
            var precipProbability = data.precipProbability*100;
            callback(undefined, "Temperature outside is " + temperature + ". There are " + precipProbability + "% chances of rain");
    
        }
    });

};

module.exports = forecast;