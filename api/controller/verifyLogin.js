'use strict';

var firebase = require('./FirebaseAdmin');

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

    var ref = firebase.database().ref('USER_DATA/' + uid);
    ref.once('value').then(async function (snapshot) {
        if (snapshot.val() == null) {

            const genBarF = async () => {
                var barcode = genBarcode()
                    .then(function () {
                        return barcode;
                    });
            }

            function setBarF(barcode) {
                console.log(barcode);
                firebase.database().ref('USER_DATA').child(uid).set({
                    barcode: barcode,
                    email: email,
                });
            }

            function setBar(barcode) {
                console.log(barcode + 'bar');
            }
            // genBarF().then(setBar);

            genBarcode(setBarF);
        }
        res.json({
            status: 'ok',
            message: 'login successful',
        });
    });

    /**
     * TODO
     *      Check if there's uid exist
     *      if false => gennewbarcode and set for
     *      USER_DATA/<uid>/email
     */
}

async function genBarcode(_callback) {

    var isDuplicate = true;

    while (isDuplicate) {

        var result = '593040';  // start with 593040
        result += randMinMax(0, 99999999).toString();  // random another 8 digits

        console.log('Generate...');

        await firebase.database().ref('BARCODE_DATA').child(result)
            .once('value').then(function (snapshot) {
                if (snapshot.val() != null) {
                    console.log('gen again');
                }
                else {
                    isDuplicate = false;
                    console.log('gotcha!');
                    _callback(result);
                    return result;
                }
            });
    }
}

function randMinMax(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}