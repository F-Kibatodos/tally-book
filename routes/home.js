const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  const keyword = req.query.keyword
  const month = req.query.month
  let displayMonth = req.query.month
  if (displayMonth === '-01-') displayMonth = '一月'
  else if (displayMonth === '-02-') displayMonth = '二月'
  else if (displayMonth === '-03-') displayMonth = '三月'
  else if (displayMonth === '-04-') displayMonth = '四月'
  else if (displayMonth === '-05-') displayMonth = '五月'
  else if (displayMonth === '-06-') displayMonth = '六月'
  else if (displayMonth === '-07-') displayMonth = '七月'
  else if (displayMonth === '-08-') displayMonth = '八月'
  else if (displayMonth === '-09-') displayMonth = '九月'
  else if (displayMonth === '-10-') displayMonth = '十月'
  else if (displayMonth === '-11-') displayMonth = '十一月'
  else if (displayMonth === '-12-') displayMonth = '十二月'
  const findKeyword = new RegExp(keyword, 'i')
  const findMonth = new RegExp(month, 'g')
  Record.find({
    userId: req.user._id,
    $and: [
      { category: { $regex: findKeyword } },
      { date: { $regex: findMonth } }
    ]
  })
    .sort({ date: -1 })
    .exec((err, record) => {
      if (err) return console.error(err)
      res.render('index', {
        style: 'index.css',
        record,
        keyword,
        month,
        displayMonth: displayMonth || '月份(全部)',
        displayKeyword: keyword || '分類(全部)'
      })
    })
})

module.exports = router
