const express = require('express')
const router = express.Router()

router.get('/new', (req, res) => {
  res.send('新增支出頁面')
})

router.post('/new', (req, res) => {
  res.send('執行新增')
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
  res.send('刪除')
})

module.exports = router
