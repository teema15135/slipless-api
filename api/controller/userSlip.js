'use stricts';

var User = require('../models/userData');

exports.getAll = function(req, res) {
    console.log('get all uid ' + req.query.uid + ' slip');
    User.findOne({_id: req.query.uid}, function(err, doc) {
        res.json({
            slips: doc.slip
        });
    });
}