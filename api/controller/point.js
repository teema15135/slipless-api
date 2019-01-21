'use stricts';

var User = require('../models/userData');

exports.get = function (req, res) {
    User.findById(req.query.uid, function (err, docs) {
        res.json(docs.point);
    });
}