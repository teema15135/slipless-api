'use stricts';

var firebase = require('./FirebaseAdmin');

exports.getAll = function(req, res) {
    console.log('get all uid ' + req.query.uid + ' slip');
    // res.send('get all of slip');
    var ref = firebase.database().ref('USER_DATA/' + req.query.uid +  '/slip');
    ref.once('value').then(function(snap) {
        console.log(snap.val());
        res.json(snap.val());
    });
}

exports.getRecent = function(req, res) {
    console.log('get recent slip for uid ' + req.query.uid);
    // res.send('get some of slip');
    var ref = firebase.database().ref('USER_DATA/' + req.query.uid + '/slip');
    ref.once('value', function(snap) {
        console.log(snap.val());
        res.json(snap.val());
    });
}