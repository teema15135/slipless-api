'use stricts';

exports.get = function (req, res) {
    res.sendFile(__dirname + '/out/slips/' + req.params.sid + '-1.jpg');
}