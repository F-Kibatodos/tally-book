const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')
const displayMonthMenu = require('../displayMonth')
const displaySortMenu = require('../sort')

router.get('/', authenticated, (req, res) => {
  // 排序
  const sort = {}
  let sortKey = req.query.sortKey || 'date'
  let sortValue = req.query.sortValue || '-1'
  sort[sortKey] = sortValue
  let displaySort
  let newDisplaySort = displaySortMenu(sortKey, sortValue, displaySort)
  // 查詢
  const keyword = req.query.keyword
  const month = req.query.month
  // 讓查詢方法秀在 dropdown上
  let displayMonth = req.query.month
  let newDisplayMonth = displayMonthMenu(displayMonth)
  const findKeyword = new RegExp(keyword, 'i')
  const findMonth = new RegExp(month, 'g')
  Record.find({
    userId: req.user._id,
    $and: [
      { category: { $regex: findKeyword } },
      { date: { $regex: findMonth } }
    ]
  })
    .sort(sort)
    .exec((err, record) => {
      if (err) return console.error(err)
      res.render('index', {
        style: 'index.css',
        record,
        keyword,
        month,
        newDisplayMonth: newDisplayMonth || '月份(全部)',
        displayKeyword: keyword || '分類(全部)',
        newDisplaySort: newDisplaySort
      })
    })
})

module.exports = router
