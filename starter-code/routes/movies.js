const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const Celebrity = require("../models/Celebrity");
const app = require("../app");
const { route } = require(".");

// GET

// RENDERING A VIEW

router.get("/movies/new", (req, res) => {
  Celebrity.find().then((celebFromDB) => {
    // console.log(celebFromDB);
    res.render("movies/new", { celebList: celebFromDB });
  });
});

router.get("/movies", (req, res, next) => {
  Movie.find()
    .populate("cast")
    .then((moviesFromDB) => {
      console.log(moviesFromDB);
      res.render("movies/index", { moviesList: moviesFromDB });
    })
    .catch((error) => {
      next(error);
    });
});

// MOVIE VIEW

router.get("/movies/:id", (req, res, next) => {
  const id = req.params.id;

  Movie.findById(id)
    .populate("cast")
    .then((movieFromDB) => {
      console.log(movieFromDB);
      res.render("movies/show", { movie: movieFromDB });
    })
    .catch((error) => {
      next(error);
    });
});

// EDIT

router.get("/movies/:id/edit", (req, res) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movieToEdit) => {
      console.log(movieToEdit);
      res.render("movies/edit", { movie: movieToEdit });
    });
});

// POST

// ADD NEW MOVIE

router.post("/movies", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({
    title: title,
    genre: genre,
    plot: plot,
    cast: cast,
  })
    .then((newMovie) => {
      console.log(`A new movie was added ${newMovie}`);
      res.redirect(`/movies/${newMovie._id}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
