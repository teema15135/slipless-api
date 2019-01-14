'use stricts';

var firebase = require('./FirebaseAdmin');

var Slip = require('../models/slipData');

exports.info = function (req, res) {

    var sid = req.query.sid;

    if (sid == null || sid == '') {
        res.json({
            status: 'error',
            message: 'slip id is required',
        });
        return null;
    }

    Slip.findOne({ _id: sid }, function (err, doc) {
        res.json(doc);
    });

    // var ref = firebase.database().ref('SLIP_DATA/' + sid);
    // ref.once('value').then(function (snapshot) {
    //     if (snapshot.val() == null) {
    //         res.json({
    //             status: 'error',
    //             message: 'slip id is invalid',
    //         });
    //         return null;
    //     }
    //     res.json(snapshot.val());
    // });
}

exports.multiInfo = async function (req, res) {
    var slipIDs = req.body.sid;
    console.log(slipIDs);

    var slipInfos = [];
    Slip.find({
        '_id' : {
            $in: slipIDs
        }
    }, function(err, docs) {
        res.json(docs);
    });
}
