var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var scoreboard = require('./routes/scoreboard');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/scoreboard', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});


var app = express();
//parsing bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/score', scoreboard);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404).send({ "status": "failed to find resource" });
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Express server listening on port ' + server.address().port);
});