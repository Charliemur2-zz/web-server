'use strict'
const request = require('postman-request')

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=7f2d25e278235fca4d94f72d921605de&query=${lat},${long}`
    request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('unable to connect to weather service', undefined)
    } else if (body.error) {
      callback('unable to find location', undefined)
    } else {
      callback(undefined, `${body.current.weather_descriptions[0]}, It is currently ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degrees out`)    
    }
  })
}

module.exports = forecast
