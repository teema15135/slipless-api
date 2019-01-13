'use stricts';

var firebase = require('./FirebaseAdmin');

exports.info = function (req, res) {

    var sid = req.query.sid;

    if (sid == null || sid == '') {
        res.json({
            status: 'error',
            message: 'slip id is required',
        });
        return null;
    }

    var ref = firebase.database().ref('SLIP_DATA/' + sid);
    ref.once('value').then(function (snapshot) {
        if (snapshot.val() == null) {
            res.json({
                status: 'error',
                message: 'slip id is invalid',
            });
            return null;
        }
        res.json(snapshot.val());
    });
}

exports.multiInfo = async function (req, res) {
    var slipIDs = req.body.sid;
    console.log(slipIDs);
    var slipInfos = [];

    function getData(_callback) {
        slipIDs.forEach(function (sid) {
            var ref = firebase.database().ref('SLIP_DATA/' + sid);
            ref.on('value', function (snap) {
                slipInfos.push(snap.val());
                console.log(snap.val());
                console.log('for id ' + sid);
            });
        });
        await _callback(slipInfos);
    }

    async function sendResponse(slipInfos) {
        await res.json(slipInfos);
    }

    getData(sendResponse);
}