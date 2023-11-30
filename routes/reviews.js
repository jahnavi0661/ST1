const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const Review = require('../models/review');

// POST 
router.post('/:movieId/reviews', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.movieId);
        if (!movie) {
          return res.status(404).json({ error: 'Movie not found' });
        }
    
        const newReview = new Review(req.body);
        movie.reviews.push(newReview);
        await movie.save();
    
        res.json(newReview);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
});

// GET 
router.get('/:movieId/reviews', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
    
        const movie = await Movie.findById(req.params.movieId);
        if (!movie) {
          return res.status(404).json({ error: 'Movie not found' });
        }
    
        const reviews = await Review.find({ _id: { $in: movie.reviews } })
          .skip((page - 1) * pageSize)
          .limit(pageSize);
    
        res.json(reviews);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
});

// PUT 
router.put('/:movieId/reviews/:reviewId', async (req, res) => {
    
});

module.exports = router;
