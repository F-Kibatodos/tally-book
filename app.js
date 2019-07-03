const express = require('express')
const app = express()

const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')

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

// 使用 session
app.use(
  session({
    secret: 'how much do you left'
  })
)

// 使用 Passport
app.use(passport.initialize())
app.use(passport.session())

// 載入 Passport config
require('./config/passport')(passport)

// 做一個 middleware，登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

db.on('error', () => {
  console.log('db not connected')
})

db.once('open', () => {
  console.log('db connected')
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

app.use('/', require('./routes/home'))

app.use('/record', require('./routes/record'))

app.use('/user', require('./routes/user'))

app.listen(3000)
