const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/book', {
  useNewUrlParser: true,
  useCreateIndex: true
})
const db = mongoose.connection
const Record = require('../record')
const User = require('../user')
const recordList = require('../../record.json').results
const users = require('../../user.json').results
const bcrypt = require('bcryptjs')

db.on('error', () => {
  console.log('db not connected')
})

db.once('open', () => {
  console.log('db connected')
  for (let i = 0; i < 2; i++) {
    const newUser = new User({
      name: users[i].name,
      email: users[i].email,
      password: users[i].password
    })
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        newUser.password = hash
        newUser
          .save()
          .then(user => {
            let records =
              i === 0 ? recordList.slice(0, 3) : recordList.slice(3, 6)

            for (let record of records) {
              const { name, date, category, amount } = record
              Record.create({
                userId: newUser._id,
                name,
                category,
                date,
                amount
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      })
    })
  }
  console.log('Seed established')
})
