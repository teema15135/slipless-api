'use stricts';

var User = require('../models/userData');

exports.get = function (req, res) {
    var uid = req.query.uid;

    if (uid == null || uid == '') {
        res.json({
            status: 'error',
            message: 'uid is required',
        });
        return null;
    }
    User.findById(req.query.uid, function (err, docs) {
        res.json({bookmark: docs.fav});
    });
}

exports.add = function (req, res) {
    var uid = req.query.uid;

    if (uid == null || uid == '') {
        res.json({
            status: 'error',
            message: 'uid is required',
        });
        return null;
    }
    User.updateOne({ _id: req.query.uid }, {
        $push: {
            fav: {
                $each: [
                    {
                        sid: req.query.sid,
                        slip_name: req.body.slip_name
                    }
                ],
                $sort: {sid : -1}
            }
        }
    }, function (err, docs) {
        
    });
    res.send('add ' + req.query.sid + ' to ' + req.query.uid);
}

exports.remove = function (req, res) {
    var uid = req.query.uid;

    if (uid == null || uid == '') {
        res.json({
            status: 'error',
            message: 'uid is required',
        });
        return null;
    }
    User.updateOne({_id: req.query.uid}, {
        $pull: {
            fav: {
                sid: {
                    $eq: req.query.sid
                }
            }
        }
    }, function(err, doc) {
        res.json(doc);
    });
}