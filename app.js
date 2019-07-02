const express = require('express')
const app = express()

const exphbs = require('express-handlebars')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/book', {
  useNewUrlParser: true,
  useCreateIndex: true
})
const db = mongoose.connection
const Record = require('./models/record')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

db.on('error', () => {
  console.log('db not connected')
})

db.once('open', () => {
  console.log('db connected')
})

app.get('/', (req, res) => {
  Record.find({}, null, { skip: 0, limit: 5 })
    .sort({ name: 'desc' })
    .exec((err, record) => {
      if (err) return console.error(err)
      res.render('index', { record })
    })
})

app.use('/record', require('./routes/record'))

app.listen(3000)
