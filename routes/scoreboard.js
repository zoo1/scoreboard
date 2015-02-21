var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var crypt = require('../crypt/crypt.js');
var Score = require('../models/scoreboard.js');

/* GET /score listing. */
router.get('/', function(req, res, next) {
  Score.find(null, 'user score -_id', 
  {
    skip:0, // Starting Row
    limit:100, // Ending Row
    sort:{
        score: -1 //Sort by score Added DESC
    }
  },
    function (err, scores) {
    if (err) return next(err);
    res.json(scores);
  });
});

/* POST /score */
router.post('/', function(req, res, next) {
  if( !( req.body.user && req.body.score ) ) 
  {
    return res.json({"status":"failed"});
  }
  
  var decryptuser = crypt.decrypt(req.body.user);
  var decryptscore = crypt.decrypt(req.body.score);
  console.log(decryptuser);
  console.log(decryptscore);

  Score.create(req.body, function (err, post) {
    if (err) return next(err);
    Score.count({ score: { $gt: req.body.score } }, function( err, count){
    res.json( {"rank": count+1 });
    });
  });
});


module.exports = router;
