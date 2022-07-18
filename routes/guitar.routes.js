const router = require('express').Router()

//Required for Schemas
const Guitar = require('../models/Guitar.model')
const User = require('../models/User.model')

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require('../middleware/isLoggedOut')
const isLoggedIn = require('../middleware/isLoggedIn')

//READ list of guitars
router.get('/', async (req, res, next) => {
  try {
    const guitarList = await Guitar.find().populate('user')
    res.render('guitars/guitars', { guitarList })
  } catch (error) {
    console.log('error while retrieving list of guitars from DB ,', error)
    next()
  }
})

// CREATE: Render form
router.get('/create', isLoggedIn, async (req, res, next) => {
  try {
    const typeOptions = ['Electric', 'Classic', 'Acoustic']
    const user = req.session.user
    res.render('guitars/guitar-create', { typeOptions, user })
  } catch (error) {
    console.log('Error getting users from DB', error)
    next(error)
  }
})

// CREATE: Process form
router.post('/create', isLoggedIn, async (req, res, next) => {
  console.log(req.body)
  const newGuitar = {
    nickName: req.body.nickName,
    brand: req.body.brand,
    model: req.body.model,
    countryOrigin: req.body.countryOrigin,
    type: req.body.type,
    year: req.body.year,
    fingerboardMaterial: req.body.fingerboardMaterial,
    pickupConfig: req.body.pickupConfig,
    image: req.body.image,
    artists: req.body.artists,
    user: req.session.user._id,
  }
  const typeOptions = ['Electric', 'Classic', 'Acoustic']
  if (!newGuitar.nickName || !newGuitar.brand || !newGuitar.model) {
    return res.status(400).render('guitars/guitar-create', {
      typeOptions,
      errorMessage:
        "Hey! Guitars were born with a nickname, brand, model and a type. Please don't forget to add them all!",
    })
  }

  // if (!newGuitar.nickName || !newGuitar.brand || !newGuitar.model || !newGuitar.type) {
  //   return res.status(400).render('guitars/guitar-create', {
  //     errorMessage:
  //       "Hey! Guitars were born with a nickname, brand, model and a type. Please don't forget to add them all!",
  //   })
  // }

  try {
    await Guitar.create(newGuitar)
    res.redirect('/guitars')
  } catch (error) {
    console.log('Error creating guitar in the DB', error)
    next(error)
  }
})

// READ: Guitar details
router.get('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const guitarDetails = await Guitar.findById(id).populate('user')
    res.render('guitars/guitar-details', guitarDetails)
  } catch (error) {
    console.log('Error getting guitar details from DB', error)
    next(error)
  }
})

// UPDATE: Render form
router.get('/:id/edit', isLoggedIn, async (req, res, next) => {
  const id = req.params.id
  try {
    const guitarDetails = await Guitar.findById(id).populate('user')
    res.render('guitars/guitar-edit', guitarDetails)
  } catch (error) {
    console.log('Error getting guitar details from DB', error)
    next(error)
  }
})

// UPDATE: Process form
router.post('/:id/edit', isLoggedIn, async (req, res, next) => {
  const id = req.params.id

  const newDetails = {
    nickName: req.body.nickName,
    brand: req.body.brand,
    model: req.body.model,
    countryOrigin: req.body.countryOrigin,
    type: req.body.type,
    year: req.body.year,
    fingerboardMaterial: req.body.fingerboardMaterial,
    pickupConfig: req.body.pickupConfig,
    image: req.body.image,
    artists: req.body.artists,
    user: req.session.user._id,
  }
  try {
    await Guitar.findByIdAndUpdate(id, newDetails)
    res.redirect('/guitars')
  } catch (error) {
    console.log('Error updating guitar in DB', error)
    next(error)
  }
})

// DELETE: delete guitar
router.post('/:id/delete', isLoggedIn, async (req, res, next) => {
  const id = req.params.id
  try {
    await Guitar.findByIdAndRemove(id)
    res.redirect('/guitars')
  } catch (error) {
    console.log('Error deleting guitar from DB', error)
    next(error)
  }
})

module.exports = router
