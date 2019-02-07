'use stricts';

var User = require('../models/userData');

exports.get = function (req, res) {
    var uid = req.query.uid;

    if (uid == null || uid == '') {
        res.json({
            status: 'error',
            message: 'uid is required',
        });
        return null;
    }
    User.findById(req.query.uid, function (err, docs) {
        res.json({
            points: docs.point
        });
    });
}