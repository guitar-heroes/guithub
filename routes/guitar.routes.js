//CHANGED APP.JS

const Guitar = require("../models/Guitar.model");

const router = require("express").Router();

/* GET home page */
// router.get("/", async (req, res, next) => {
//   res.render("index");
// });

router.get("/guitars", async (req, res, next) => {
  const guitarList = await Guitar.find();
    res.render("/guitar", guitarList)
  .catch((error) => {
    console.log("error while retrieving list of guitars from DB ,", error);
    next();
  })
  res.render("guitars");
});



module.exports = router;
