'use strict';

module.exports = function(app) {

    var barcode = require('../controller/barcodeGet');
    var chompusudsuay = require('../controller/chompusudsuay');
    var verifyLogin = require('../controller/verifyLogin');
    var slip = require('../controller/getSlip');
    var userSlip = require('../controller/userSlip');
    var bookmark = require('../controller/bookmark');
    var point = require('../controller/point');

    app.route('/getBarcode')
        .get(barcode.getIt);

    app.route('/slip')
        .get(slip.info);

    app.route('/multiSlip')
        .post(slip.multiInfo);

    app.route('/post')
        .post(chompusudsuay.send);

    app.route('/login')
        .get(verifyLogin.verify);

    app.route('/allSlip')
        .get(userSlip.getAll);

    app.route('/bookmark')
        .get(bookmark.get)
        .post(bookmark.add);
    
    app.route('/point')
        .get(point.get);
};
