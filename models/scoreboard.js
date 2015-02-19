var mongoose = require('mongoose');

var ScoreSchema = new mongoose.Schema({
  player: String,
  score: Number
});

module.exports = mongoose.model('Score', ScoreSchema);
