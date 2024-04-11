// routes/movieRoutes.js

const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Route to retrieve movies
router.get('/movies', movieController.getMovies);
router.get('/movies/year/:year', movieController.getMoviesByYear);
router.get('/movies/title/:title', movieController.getMoviesByTitle);

// Add more routes for other movie-related operations as needed

module.exports = router;
