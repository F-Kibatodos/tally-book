const express = require('express')
const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/book', {
  useNewUrlParser: true,
  useCreateIndex: true
})
const db = mongoose.connection
const Record = require('./models/record')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(flash())

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 使用 session
app.use(
  session({
    secret: 'how much do you left',
    resave: 'false',
    saveUninitialized: 'false'
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
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

db.on('error', () => {
  console.log('db not connected')
})

db.once('open', () => {
  console.log('db connected')
})

app.use('/', require('./routes/home'))

app.use('/record', require('./routes/record'))

app.use('/user', require('./routes/user'))

app.use('/auth', require('./routes/auths'))

app.listen(process.env.PORT || 3000)
