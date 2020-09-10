const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity");
const app = require("../app");
const { route } = require(".");
const Movie = require("../models/Movie");

// GET

// LIST ALL CELEBRITIES

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDB) => {
      console.log(celebritiesFromDB);
      res.render("celebrities/index", { celebritiesList: celebritiesFromDB });
    })
    .catch((error) => {
      next(error);
    });
});

// ADD

router.get("/celebrities/new", (req, res, next) => {
  res.render("celebrities/new");
});

// CELEB VIEW

router.get("/celebrities/:id", (req, res, next) => {
  const id = req.params.id;

  Celebrity.findById(id)
    .then((celebFromDB) => {
      console.log(celebFromDB);
      res.render("celebrities/show", { celebrity: celebFromDB });
    })
    .catch((error) => {
      next(error);
    });
});

// EDIT

router.get("/celebrities/:id/edit", (req, res) => {
  Celebrity.findById(req.params.id).then((celebToEdit) => {
    res.render("celebrities/edit", { celebrity: celebToEdit });
  });
});

// POST

// ADD

router.post("/celebrities", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase,
  })
    .then((newCeleb) => {
      console.log(`A new celeb was added ${newCeleb}`);
      res.redirect(`/celebrities/${newCeleb._id}`);
    })
    .catch((error) => {
      next(error);
    });
});

// DELETE

router.post("/celebrities/:id/delete", (req, res, next) => {
  const id = req.params.id;

  Celebrity.findByIdAndRemove(id)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((error) => {
      next(error);
    });
});

// EDIT

router.post("/celebrities/:id/edit", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.findByIdAndUpdate(req.params.id, {
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase,
  })
    .then((editCeleb) => {
      console.log("Edit a celeb", editCeleb);
      // need to pass update method
      // need to add link in a view (?)
      res.redirect("/celebrities");
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
