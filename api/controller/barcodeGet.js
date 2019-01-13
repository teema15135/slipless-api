'use strict';

var firebase = require('./FirebaseAdmin');

exports.getIt = async (req, res) => {

    var uid = req.query.uid;

    if (uid == null || uid == '') {
        res.json({
            status: 'error',
            message: 'uid is required',
        });
    }

    var ref = firebase.database().ref('USER_DATA/' + uid);
    ref.once('value').then(function (snapshot) {
        var code = snapshot.child('barcode').val();

        if (code == null) {
            res.json({
                status: 'error',
                message: 'uid is invalid',
            });
            return null;
        }

        var email = snapshot.child('email').val();
        var bar = {
            status: 'ok',
            barcode_num: code,
            email: email,
            uid: req.query.uid,
        }
        res.json(bar);
    });


};
