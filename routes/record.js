const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const moment = require('moment')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const { name, date, category, cost } = req.body
  const formattedDate = moment(date).format('YYYY / MM / DD')
  const newRecord = new Record({
    date: formattedDate,
    name,
    category,
    cost
  })
  newRecord.save(err => {
    if (err) return console.error(err)
    res.redirect('/')
  })
})

router.get('/:id/detail', (req, res) => {
  res.send('詳細支出情形')
})

router.get('/:id/edit', (req, res) => {
  res.send('編輯頁面')
})

router.put('/:id/edit', (req, res) => {
  res.send('執行編輯')
})

router.delete('/:id/delete', (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)
    record.remove(err => {
      if (err) return console.error(err)
      res.redirect('/')
    })
  })
})

module.exports = router
