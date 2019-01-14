'use strict';

var firebase = require('./FirebaseAdmin');
var User = require('../models/userData');
var Barcode = require('../models/barcodeData');

exports.verify = function (req, res) {
    var uid = req.query.uid;
    var email = req.query.email;

    if (uid == null || email == null || uid == '') {
        res.json({
            status: 'error',
            message: 'uid and email are required',
        });
        return null;
    }

    User.findById(uid, function (err, docs) {
        if (docs == null) {
            function setBarF(barcode) {
                console.log(barcode);
                var newUser = new User({
                    _id: uid,
                    barcode: barcode,
                    email: email
                });
                newUser.save(function (err, docs) {
                    console.log('new account created!');
                    recordBarcode(barcode);
                });
            }

            function recordBarcode(barcode) {
                var newBarcode = new Barcode({
                    _id: barcode,
                    uid: uid
                });
                newBarcode.save(function (err, docs) {
                    console.log('record new barcode!');
                });
            }

            genBarcode(setBarF);

            res.json({
                status: 'ok',
                message: 'login successful',
            });
        }
    });
}

function genBarcode(_callback) {

    var isDuplicate = true;
    var result = '593040';  // start with 593040
    var random = randMinMax(0, 99999999).toString();  // random another 8 digits
    if(random.length != 8) {
        for(var i = 0; i < 8-random.length; i++) {
            random = '0' + random;
        }
    }
    result += random;

    console.log('Generate...');

    User.find({ barcode: result }, function (err, docs) {
        if (docs[0] == null) {
            console.log(docs);
            isDuplicate = false;
            console.log('gotcha!');
            _callback(result);
            return result;
        }
        else {
            console.log(docs);
            console.log('gen again');
            return genBarcode(_callback);
        }
    });
}

function randMinMax(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}