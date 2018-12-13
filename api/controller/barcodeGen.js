'use strict';

var firebase = require('./FirebaseAdmin');

exports.generate = async (req, res) => {
    if(req.query.email == null || req.params.email == '')
        res.json({status: 'email is require'});
    var newBarcode = await genBarcode();
    var bar = {
        status: 'ok',
        barcode_num: newBarcode,
        email: req.query.email,
    }
    await res.json(bar);

    // remove the old barcode
    var ref = firebase.database().ref('API_DATA');
    await ref.orderByChild('email').equalTo(req.query.email)
    .once('value').then(function(snapshot) {
        console.log(snapshot.key);
        snapshot.forEach(function(childSnapshot) {
            ref.child(childSnapshot.key).remove();
        });
    });
    
    await firebase.database().ref('API_DATA').push({
        barcode_num: newBarcode,
        email: req.query.email
    });

    res.end();
};

async function genBarcode() {
    var result = '593040';  // start with 593040
    result += randMinMax(0,99999999).toString();  // random another 8 digits

    var isExist = false;
    firebase.database().ref('API_DATA')
    .orderByChild('barcode_num').equalTo(result)
    .on('child_added', function() {         // regenerate if there exists barcode
        isExist = true;
    });
    if(isExist)
        return genBarcode();

    return result;
}

function randMinMax(min, max) {
    return Math.floor((Math.random() * (max-min+1)) + min);
}