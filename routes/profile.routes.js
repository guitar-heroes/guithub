const router = require('express').Router()

const User = require('../models/User.model')
const Guitar = require('../models/Guitar.model')
const isLoggedIn = require('../middleware/isLoggedIn')

router.get('/', isLoggedIn, async (req, res, next) => {
  const user = req.session.user
  res.render('layout', user)
})

router.get('/:id', isLoggedIn, async (req, res, next) => {
  const id = req.params.userId
  try {
    const user = await User.findById(id)
    console.log({ user })
    res.render('profile/profile-page', { user })
  } catch (error) {
    console.log('error while retrieving list of guitars from DB ,', error)
    next()
  }
})

router.get('/:userId/collection', isLoggedIn, async (req, res, next) => {
  try {
    const collection = await Guitar.find({ user: req.params.userId })
    const user = await User.findById(req.params.userId)
    res.render('profile/my-collection', { collection, user })
  } catch (err) {
    console.log('Error finding your beaties: ', error)
  }
})

module.exports = router
