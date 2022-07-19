const router = require('express').Router()

const User = require('../models/User.model')
const Guitar = require('../models/Guitar.model')

const isLoggedOut = require('../middleware/isLoggedOut')
const isLoggedIn = require('../middleware/isLoggedIn')

router.get('/', isLoggedIn, async (req, res, next) => {
  res.render('profile/profile-page', { user: req.session.user })
})

router.get('/:userId/collection', isLoggedIn, async (req, res, next) => {
  const collection = await Guitar.find({ user: req.params.userId })
  res.render('profile/collection', { collection })
})

module.exports = router
