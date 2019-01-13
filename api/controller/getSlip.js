'use strict';

var firebase = require('./FirebaseAdmin');

exports.info = function(req, res) {

    var sid = req.query.sid;

    if(sid == null || sid == '') {
        res.json({
            status: 'error',
            message: 'slip id is required',
        });
        return null;
    }

    var ref = firebase.database().ref('SLIP_DATA/' + sid);
    ref.once('value').then(function(snapshot) {
        if(snapshot.val() == null) {
            res.json({
                status: 'error',
                message: 'slip id is invalid',
            });
            return null;
        }
        res.json(snapshot.val());
    });
}