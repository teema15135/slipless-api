'use strict';

var mongoose = require('mongoose');
User = mongoose.model('userData');
var User = mongoose.model('userData');

exports.getIt = (req, res) => {

    var uid = req.query.uid;

    if (uid == null || uid == '') {
        res.json({
            status: 'error',
            message: 'uid is required',
        });
        return null;
    }

    User.findOne({ _id: uid }, function (err, docs) {
        console.log(docs);
        if (docs == null) {
            res.json({
                status: 'error',
                message: 'uid is invalid',
            });
            return null;
        }
        var bar = {
            status: 'ok',
            barcode_num: docs.barcode,
            email: docs.email,
            uid: req.query.uid,
        }
        res.json(bar);
    });
};
