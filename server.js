var express = require('express'),
    app = express(),
    port = 8065,
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/urlRoutes');
routes(app);

app.listen(port);
console.log('Running RestAPI at port ' + port);