const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  cost: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Book', bookSchema)
