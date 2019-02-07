'use stricts';

var User = require('../models/userData');

exports.get = function (req, res) {
    console.log('got coupon request');
    var uid = req.query.uid;

    if (uid == null || uid == '') {
        res.json({
            status: 'error',
            message: 'uid is required',
        });
        return null;
    }
    
    User.findById(req.query.uid, function (err, docs) {
        res.json({ coupon: docs.coupon });
    })
}

exports.del = function (req, res) {
    var uid = req.query.uid;

    if (uid == null || uid == '') {
        res.json({
            status: 'error',
            message: 'uid is required',
        });
        return null;
    }
    User.updateOne({_id: req.query.uid}, {
        $pull: {
            coupon: {
                coupon_barcode: {
                    $eq: req.query.bar
                }
            }
        }
    }, function(err, doc) {
        res.json(doc);
    });
}