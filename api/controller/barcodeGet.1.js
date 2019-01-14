'use strict';

var firebase = require('./FirebaseAdmin');
var mongoose = require('mongoose');
User = mongoose.model('userData');
var User = mongoose.model('userData');

exports.getIt = (req, res) => {
    /**
     * access database find objectid equal to uid
     * get barcode
     * send json
     * {
     *  status: 'ok',
     *  barcode_num: code that,
     *  email: email from uid,
     *  uid: req.query.uid
     * }
     */

    var uid = req.query.uid;

    if (uid == null || uid == '') {
        res.json({
            status: 'error',
            message: 'uid is required',
        });
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
