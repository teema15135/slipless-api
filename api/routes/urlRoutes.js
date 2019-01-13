'use strict';

module.exports = function(app) {

    var barcode = require('../controller/barcodeGet');
    var chompusudsuay = require('../controller/chompusudsuay');
    var verifyLogin = require('../controller/verifyLogin');
    var slip = require('../controller/getSlip');
    var userSlip = require('../controller/userSlip');
    var favorite = require('../controller/favorite');

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

    app.route('/recent')
        .get(userSlip.getRecent);

    app.route('/allSlip')
        .get(userSlip.getAll);

    app.route('/fav')
        .get(favorite.get)
        .post(favorite.add);
    
};