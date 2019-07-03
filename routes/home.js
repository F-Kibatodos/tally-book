const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  Record.find({})
    .sort({ name: 'desc' })
    .exec((err, record) => {
      if (err) return console.error(err)
      res.render('index', { style: 'index.css', record })
    })
})

module.exports = router
