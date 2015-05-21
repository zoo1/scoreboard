var express = require('express');
var router = express.Router();

var crypt = require('../crypt/crypt.js');
var Score = require('../models/scoreboard.js');

/* GET /score/ listing. */
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

/* POST /score/ */
router.post('/', function(req, res, next) {
  if( !( req.body.user && req.body.score ) ) //user and score dont exist
  {
    return res.json({"status":"failed to update"});
  }
  try {
    var decryptuser = crypt.decrypt(req.body.user);
    var decryptscore = crypt.decrypt(req.body.score);
  }
  catch(err){
    console.log(err);
    return res.json({"status":"failed to update"}); //score and user were not decoded correctly
  }

  function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
  }

  if(!isInt(decryptscore))
    return res.json({"status":"failed to update"}); //score is not an integer
  
  if(parseInt(Number(decryptscore))<0)
    return res.json({"status":"failed to update"}); //score is not positive

  Score.create({ "user" : decryptuser, "score" : decryptscore }, function (err, post) {
    if (err) return next(err);
    Score.count({ score: { $gt: decryptscore } }, function( err, count){
    res.json( {"rank": count+1 });
    });
  });
});


module.exports = router;
