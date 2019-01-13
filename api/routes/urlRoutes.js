'use strict';

module.exports = function(app) {

    var barcode = require('../controller/barcodeGet');
    var chompusudsuay = require('../controller/chompusudsuay');
    var verifyLogin = require('../controller/verifyLogin');
    var slip = require('../controller/getSlip');

    app.route('/getBarcode')
        .get(barcode.getIt);

    app.route('/slip')
        .get(slip.info);

    app.route('/post')
        .post(chompusudsuay.send);

    app.route('/login')
        .get(verifyLogin.verify);

    
};