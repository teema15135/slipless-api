'use stricts';

var User = require('../models/userData');

exports.get = function (req, res) {
    User.findById(req.query.uid, function (err, docs) {
        res.json(docs.fav);
    });
}

exports.add = function (req, res) {
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
    User.updateOne({_id: req.query.uid}, {
        $pull: {
            fav: {
                $eq: req.query.sid
            }
        }
    });
}