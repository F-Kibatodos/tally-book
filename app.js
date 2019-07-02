const express = require('express')
const app = express()

const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/book', {
  useNewUrlParser: true,
  useCreateIndex: true
})
const db = mongoose.connection
const Record = require('./models/record')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

db.on('error', () => {
  console.log('db not connected')
})

db.once('open', () => {
  console.log('db connected')
})

app.get('/', (req, res) => {
  Record.find({})
    .sort({ name: 'desc' })
    .exec((err, record) => {
      if (err) return console.error(err)
      res.render('index', { style: 'index.css', record })
    })
})

app.get('/search', (req, res) => {
  let keyword = req.query.keyword
  let month = req.query.month
  Record.find({
    $or: [
      { category: { $regex: keyword, $options: 'i' } },
      { date: { $regex: keyword } }
    ]
  })
    .sort({ _id: 1 })
    .exec((err, record) => {
      if (err) console.error(err)
      res.render('index', { style: 'index.css', record, keyword, month })
    })
})

app.use('/record', require('./routes/record'))

app.use('/user', require('./routes/user'))

app.listen(3000)
