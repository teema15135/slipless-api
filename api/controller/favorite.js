'use stricts';

exports.get = function(req, res) {
    console.log('get favorite slip for uid ' + req.query.uid);
    res.send('get the fav');
}

exports.add = function(req, res) {
    console.log('add sid ' + req.query.sid + ' for uid ' + req.params.uid);
    res.send('add the fav');
}