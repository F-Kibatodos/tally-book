const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const moment = require('moment')
const { authenticated } = require('../config/auth')

// 新增頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 新增一筆支出紀錄
router.post('/new', authenticated, (req, res) => {
  const { name, date, category, amount } = req.body
  const formattedDate = moment(date).format('YYYY / MM / DD')
  const newRecord = new Record({
    userId: req.user.id,
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

// 編輯頁面
router.get('/:id/edit', authenticated, (req, res) => {
  Record.findOne(
    { _id: req.params.id, userId: req.user._id },
    (err, record) => {
      if (err) return console.error(err)
      res.render('edit', { record })
    }
  )
})

// 編輯功能
router.put('/:id/edit', authenticated, (req, res) => {
  const { name, date, category, amount } = req.body
  const formattedDate = moment(date).format('YYYY / MM / DD')
  Record.findOne(
    { _id: req.params.id, userId: req.user._id },
    (err, record) => {
      if (err) console.error(err)
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      record.save(err => {
        if (err) return console.error(err)
        res.redirect('/')
      })
    }
  )
})

// 刪除
router.delete('/:id/delete', authenticated, (req, res) => {
  Record.findOne(
    { _id: req.params.id, userId: req.user._id },
    (err, record) => {
      if (err) return console.error(err)
      record.remove(err => {
        if (err) return console.error(err)
        res.redirect('/')
      })
    }
  )
})

module.exports = router
