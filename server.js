var express = require('express'),
    app = express(),
    port = 8065,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/slipless', function(err) {
    if(err) throw err;
    console.log('Successfuly connect to database!');
});

// MongoDB schema
var User = require('./api/models/userData');
var Slip = require('./api/models/slipData');
var Barcode = require('./api/models/barcodeData');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/urlRoutes');
routes(app);

app.listen(port);
console.log('Running RestAPI at port ' + port);