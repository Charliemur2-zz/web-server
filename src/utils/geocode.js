const request = require('postman-request')

const geocode = (adress, callback) => {
  const locationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?access_token=pk.eyJ1IjoiY2hhcmxpZW11ciIsImEiOiJjbDNlcGc0dWYwMm9yM2RsNXducnBtYmluIn0.91L8Vy_N2VXg2hrXEJiORA&limit=1`
  request({ url: locationUrl, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to conect to location service', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location, check the param sent on url', undefined)
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
