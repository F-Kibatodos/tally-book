const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/book', {
  useNewUrlParser: true,
  useCreateIndex: true
})
const db = mongoose.connection
const Book = require('./models/book')

db.on('error', () => {
  console.log('db not connected')
})

db.once('open', () => {
  console.log('db connected')
})

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use('/book', require('./routes/book'))

app.listen(3000)
