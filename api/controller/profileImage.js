'use stricts';

exports.get = function (req, res) {
    res.sendFile(__dirname + '/out/profiles/' + req.params.uid + '.jpg');
}