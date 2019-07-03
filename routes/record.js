const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const moment = require('moment')
const { authenticated } = require('../config/auth')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', authenticated, (req, res) => {
  const { name, date, category, amount } = req.body
  const formattedDate = moment(date).format('YYYY / MM / DD')
  const newRecord = new Record({
    date,
    name,
    category,
    amount
  })
  newRecord.save(err => {
    if (err) return console.error(err)
    res.redirect('/')
  })
})

router.get('/:id/edit', authenticated, (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)
    res.render('edit', { record })
  })
})

router.put('/:id/edit', authenticated, (req, res) => {
  const { name, date, category, amount } = req.body
  const formattedDate = moment(date).format('YYYY / MM / DD')
  Record.findById(req.params.id, (err, record) => {
    if (err) console.error(err)
    record.name = name
    record.date = date
    record.category = category
    record.amount = amount
    record.save(err => {
      if (err) return console.error(err)
      res.redirect('/')
    })
  })
})

router.delete('/:id/delete', authenticated, (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)
    record.remove(err => {
      if (err) return console.error(err)
      res.redirect('/')
    })
  })
})

module.exports = router
