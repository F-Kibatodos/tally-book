const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')
const { check, validationResult } = require('express-validator')
const inputvalidate = require('../validator')

// 新增頁面
router.get('/new', authenticated, (req, res) => {
  res.render('new')
})

// 新增一筆支出紀錄
router.post('/new', inputvalidate(), authenticated, (req, res) => {
  const errors = validationResult(req)
  let fillErrors = []
  if (!errors.isEmpty()) {
    for (let errormessage of errors.errors) {
      fillErrors.push({ message: errormessage.msg })
    }
  }
  const { name, date, category, amount } = req.body
  if (fillErrors.length > 0) {
    res.render('new', {
      fillErrors
    })
  } else {
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
  }
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
router.put('/:id/edit', inputvalidate(), authenticated, (req, res) => {
  const errors = validationResult(req)
  let fillErrors = []
  if (!errors.isEmpty()) {
    for (let errormessage of errors.errors) {
      fillErrors.push({ message: errormessage.msg })
    }
  }
  const { name, date, category, amount } = req.body
  if (fillErrors.length > 0) {
    res.render('edit', {
      fillErrors,
      name,
      date,
      category,
      amount
    })
  } else {
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
  }
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
