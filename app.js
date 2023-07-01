const express = require('express')
const exphbs = require('express-handlebars')
const restaurant_List = require('./restaurant.json')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurant_List.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurant_List.results.find(restaurant => (
    restaurant.id.toString() === req.params.restaurant_id
  ))
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const restaurants = restaurant_List.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
  })
  res.render('index', { restaurants, keyword })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})