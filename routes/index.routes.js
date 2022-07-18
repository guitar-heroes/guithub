const Guitar = require('../models/Guitar.model')

const router = require('express').Router()

/* GET home page */
router.get('/', async (req, res, next) => {
  const guitarList = await Guitar.find()
  res.render('guitars/guitars', { guitarList })
})

module.exports = router
