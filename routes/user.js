const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const registerValidate = require('../helper/registerValidator')
const { authenticated } = require('../config/auth')
// 登入頁面
router.get('/login', (req, res) => {
  res.render('login', {
    error: req.flash('error'),
    success: req.flash('success')
  })
})

// 登入檢查
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    // 使用 passport 認證
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true,
    successFlash: `歡迎回來，這次又噴多少`
  })(req, res, next)
})

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊檢查
router.post('/register', registerValidate(), (req, res) => {
  const errors = validationResult(req)
  let loginErrors = []
  const { name, email, password, password2 } = req.body
  if (!errors.isEmpty()) {
    for (let errormessage of errors.errors) {
      loginErrors.push({ message: errormessage.msg })
    }
  }
  if (password !== password2) {
    loginErrors.push({ message: '密碼與驗證密碼不一致' })
  }
  if (loginErrors.length > 0) {
    res.render('register', {
      loginErrors,
      name,
      email,
      password,
      password2
    })
  } else {
    User.findOne({ email }).then(user => {
      if (user) {
        loginErrors.push({ message: '這個 Email 已經註冊過了' })
        res.render('register', {
          loginErrors,
          name,
          email,
          password,
          password2
        })
      } else {
        const newUser = new User({
          name,
          email,
          password
        })
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser
              .save()
              .then(user => {
                res.redirect('/user/login')
              })
              .catch(err => {
                console.log(err)
              })
          })
        })
      }
    })
  }
})

// 登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/user/login')
})

router.get('/profile/:id', authenticated, (req, res) => {
  res.render('profile', { script: 'profile.js' })
})

router.put(
  '/profile/:id',
  [
    check('name')
      .exists()
      .custom(value => /^\S+(?: \S+)*$/.test(value))
      .withMessage('名稱格式有誤'),
    check('password')
      .exists()
      .optional()
      .custom(value =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*[~!@#$%^&*(.)_\-+=\\\/]).{8,16}$/.test(
          value
        )
      )
      .withMessage('密碼格式錯誤')
  ],
  authenticated,
  (req, res) => {
    const { name, originPassword, password, password2 } = req.body
    const profileErrors = validationResult(req)
    let errorMsg = []
    if (!password && !originPassword && !password2) {
      if (!profileErrors.isEmpty()) {
        errorMsg.push({ message: profileErrors.errors[0].msg })
        return res.status(422).render('profile', {
          errorMsg,
          name,
          script: 'profile.js'
        })
      }
      User.findById(req.params.id, (err, user) => {
        if (err) return console.error(err)
        const { name } = req.body
        user.name = name
        user.save(err => {
          if (err) console.error(err)
          res.redirect('/')
        })
      })
    } else {
      User.findById(req.params.id, (err, user) => {
        bcrypt.compare(originPassword, user.password, (err, isMatch) => {
          if (err) throw err
          if (isMatch) {
            if (!profileErrors.isEmpty()) {
              for (let errormessage of profileErrors.errors) {
                errorMsg.push({ message: errormessage.msg })
              }
            }
            if (password !== password2) {
              errorMsg.push({ message: '密碼與驗證密碼不一致' })
            }
            if (errorMsg.length > 0) {
              res.render('profile', {
                errorMsg,
                name,
                password,
                password2,
                script: 'profile.js'
              })
            } else {
              User.findById(req.params.id, (err, user) => {
                if (err) console.error(err)
                bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err
                    user.name = name
                    user.password = hash
                    user
                      .save()
                      .then(user => {
                        res.redirect('/')
                      })
                      .catch(err => {
                        console.log(err)
                      })
                  })
                })
              })
            }
          } else {
            errorMsg.push({ message: '原密碼不正確' })
            if (errorMsg.length > 0) {
              res.render('profile', {
                errorMsg,
                name,
                password,
                password2,
                script: 'profile.js'
              })
            }
          }
        })
      })
    }
  }
)

module.exports = router
/*{
      if (!profileErrors.isEmpty()) {
        for (let errormessage of profileErrors.errors) {
          errorMsg.push({ message: errormessage.msg })
        }
      }
      if (password !== password2) {
        errorMsg.push({ message: '密碼與驗證密碼不一致' })
      }
      if (errorMsg.length > 0) {
        res.render('profile', {
          errorMsg,
          name,
          password,
          password2,
          script: 'profile.js'
        })
      } else {
        User.findById(req.params.id, (err, user) => {
          if (err) console.error(err)
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err
              user.name = name
              user.password = hash
              user
                .save()
                .then(user => {
                  res.redirect('/')
                })
                .catch(err => {
                  console.log(err)
                })
            })
          })
        })
      }
    } */
