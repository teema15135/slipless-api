'use strict';

module.exports = function(app) {

    var barcode = require('../controller/barcodeGen');
    var chompusudsuay = require('../controller/chompusudsuay');

    app.route('/getBarcode')
        .get(barcode.generate);

    app.route('/post')
        .post(chompusudsuay.send);
};