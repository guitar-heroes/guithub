const router = require('express').Router()

const User = require('../models/User.model')

const isLoggedOut = require('../middleware/isLoggedOut')
const isLoggedIn = require('../middleware/isLoggedIn')

router.get('/', isLoggedIn, async (req, res, next) => {
  res.render('profile/profile-page', req.user)
})

module.exports = router
