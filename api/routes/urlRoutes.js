'use strict';

module.exports = function(app) {

    var barcode = require('../controller/barcodeGet.1');
    var chompusudsuay = require('../controller/chompusudsuay.1');
    var verifyLogin = require('../controller/verifyLogin.1');
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

    app.route('/allSlip')
        .get(userSlip.getAll);

    app.route('/fav')
        .get(favorite.get)
        .post(favorite.add);
    
};
