var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Score = require('../models/scoreboard.js');

/* GET /score listing. */
router.get('/', function(req, res, next) {

  Score.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

/* POST /score */
router.post('/', function(req, res, next) {
  req.body.player;
  Score.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


module.exports = router;
