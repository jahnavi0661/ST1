const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

//POST
router.post('/', async (req,res) => {
    try {
        const newMovie = new Movie(req.body);
        const savedMovie = await newMovie.save();
        res.json(savedMovie);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
});


//GET
router.get('/', async (req,res) => {
    
});

router.get('/:movieId', async (req,res) => {
    try {
        const movie = await Movie.findById(req.params.movieId);
        if (!movie) {
          return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(movie);
      } catch (error) {
        res.status(500).json({ error: error.message });
      } 
});

//UPDATE
router.put('/:movieId', async(req,res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
          req.params.movieId,
          req.body,
          { new: true }
        );
        if (!updatedMovie) {
          return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(updatedMovie);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
});

// DELETE 
router.delete('/:movieId', async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.movieId);
        if (!deletedMovie) {
          return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(deletedMovie);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  });
  
  module.exports = router;