const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: 255 },
  description: { type: String, required: true, maxLength: 1000 },
  genre: { type: String, required: true },
  releaseYear: { type: Number, required: true, min: 1800, max: new Date().getFullYear() },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
