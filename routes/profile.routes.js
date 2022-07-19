const router = require('express').Router()

const User = require('../models/User.model')
const Guitar = require('../models/Guitar.model')
const isLoggedIn = require('../middleware/isLoggedIn')

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
