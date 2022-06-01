const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Carlos Murcia'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Carlos Murcia'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Carlos Murcia',
    massage: 'Dont worry about that'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'you must provide an address'
    })
  }
  geocode(req.query.address, (error, { lat, long, location} = {} ) => {
    if (error) {
      return res.send({ error })
    }
    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
      res.send({
        location,
        forecast: forecastData,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'you must provide search term'
    })
  }
  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404page', {
    title: 'Ups!',
    name: 'Carlos Murcia',
    massage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404page', {
    title: 'Ups!',
    name: 'Carlos Murcia',
    massage: 'Page not found'
  })
})

app.listen(3000, () => {
  console.log('The server is up in port 3000')
})
