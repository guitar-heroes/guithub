//CHANGED APP.JS

const isLoggedIn = require("../middleware/isLoggedIn");
const Guitar = require("../models/Guitar.model");
const User = require("../models/User.model");

const router = require("express").Router();

//READ list of guitars
router.get("/", async(req, res, next) => {
  try {
    const guitarList = await Guitar.find()
    .populate("user");
    res.render("guitars/guitars", {guitarList})
  } catch(error) {
    console.log("error while retrieving list of guitars from DB ,", error);
    next();
  }
});

// CREATE: Render form
router.get("/create", async(req, res, next) => {
  try {
    const typeOptions = [
      'Electric',
      'Classical',
      'Acoustic',
    ]
    const user = await User.find();
    const guitarDetails = await Guitar.find();
    res.render("guitars/guitar-create", {typeOptions, user, guitarDetails})
  } catch(error) {
    console.log("Error getting users from DB", error);
    next(error);
  } 
})

// CREATE: Process form
router.post("/create", async (req, res, next) => {
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
    artists: req.body.artists
  };
  console.log(newGuitar)
  if (!newGuitar.nickName || !newGuitar.brand || !newGuitar.model || !newGuitar.type) {
    return res.status(400).render("guitars/guitar-create", {
      errorMessage: "Hey! Guitars were born with a nickname, brand, model and a type. Please don't forget to add them all!",
    });
  }

  try {
    await Guitar.create(newGuitar)
    res.redirect("/guitars");
  } catch (error) {
      console.log("Error creating guitar in the DB", error);
      next(error);
  }
})

// READ: Guitar details
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const guitarDetails = await Guitar.findById(id)
    .populate("user")
    res.render("guitars/guitar-details", guitarDetails);
  } catch (error) {
      console.log("Error getting guitar details from DB", error);
      next(error);
    }
})


// UPDATE: Render form
router.get("/:id/edit", async (req, res, next) => {
  const id = req.params.id;
  try {
    const guitarDetails = await Guitar.findById(id)
    .populate('user')
    res.render("guitars/guitar-edit", guitarDetails);
  } catch(error) {
      console.log("Error getting guitar details from DB", error);
      next(error);
    };
});


// UPDATE: Process form
router.post("/:id/edit", async(req, res, next) => {

  const id = req.params.id;

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
    artists: req.body.artists
  }
  try{
    await Guitar.findByIdAndUpdate(id, newDetails)
    res.redirect("/guitars");
  } catch (error) {
      console.log("Error updating guitar in DB", error);
      next(error);
    }
});


// DELETE: delete guitar
router.post("/:id/delete", async (req, res, next) => {
  const id = req.params.id;
  try {
    await Guitar.findByIdAndRemove(id)
      res.redirect('/guitars');
  } catch (error) {
      console.log("Error deleting guitar from DB", error);
      next(error);
    }
})

module.exports = router;
