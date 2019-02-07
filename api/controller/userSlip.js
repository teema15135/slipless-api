'use stricts';

var User = require('../models/userData');

exports.getAll = function(req, res) {
    var uid = req.query.uid;

    if (uid == null || uid == '') {
        res.json({
            status: 'error',
            message: 'uid is required',
        });
        return null;
    }
    console.log('get all uid ' + req.query.uid + ' slip');
    User.findOne({_id: req.query.uid}, function(err, doc) {
        res.json({
            slips: doc.slip
        });
    });
}