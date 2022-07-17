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
    const user = await User.find();
    const guitarDetails = await Guitar.find();
    res.render("guitars/guitar-create", {user, guitarDetails})
  } catch(error) {
    console.log("Error getting users from DB", error);
    next(error);
  } 
})

// CREATE: Process form
router.post("/create", async (req, res, next) => {
  try {
    const newGuitar = {
      nickname: req.body.nickName,
      brand: req.body.brand,
      model: req.body.model,
      countryOrigin: req.body.countryOrigin,
      // type: req.body.type,
      fingerboardMaterial: req.body.fingerboardMaterial,
      image: req.body.image,
      artists: req.body.artists,
    };
  
    Guitar.create(newGuitar)
    res.redirect("/");
  } catch (error) {
      console.log("Error creating book in the DB", error);
      next(error);
  }
})

// // READ: Book details
// router.get("/:bookId", (req, res, next) => {
//   const bookId = req.params.bookId;

//   Book.findById(bookId)
//     .populate("author")
//     .then( (bookDetails) => {
//       res.render("books/book-details", bookDetails);
//     })
//     .catch( (error) => {
//       console.log("Error getting book details from DB", error);
//       next(error);
//     })

// })


// // UPDATE: Render form
// router.get("/:bookId/edit", checkIfLoggedIn, (req, res, next) => {
//   const {bookId} = req.params;

//   Book.findById(bookId)
//     .then( (bookDetails) => {
//       res.render("books/book-edit", bookDetails);
//     })
//     .catch( (error) => {
//       console.log("Error getting book details from DB", error);
//       next(error);
//     })

// });


// // UPDATE: Process form
// router.post("/:bookId/edit", checkIfLoggedIn, (req, res, next) => {

//   const bookId = req.params.bookId;

//   const newDetails = {
//     title: req.body.title,
//     author: req.body.author,
//     description: req.body.description,
//     rating: req.body.rating,
//   }


//   Book.findByIdAndUpdate(bookId, newDetails)
//     .then( () => {
//       // res.redirect(`/books/${bookId}`); // redirect to book details page
//       res.redirect("/books");
//     })
//     .catch( (error) => {
//       console.log("Error updating book in DB", error);
//       next(error);
//     })


// });


// // DELETE: delete book
// router.post("/:bookId/delete", checkIfLoggedIn, (req, res, next) => {
//   const {bookId} = req.params;

//   Book.findByIdAndRemove(bookId)
//     .then( () => {
//       res.redirect('/books');
//     })
//     .catch( (error) => {
//       console.log("Error deleting book from DB", error);
//       next(error);
//     })

// })

module.exports = router;
