'use strict';

exports.generate = (req, res) => {
    console.dir(req.query);
    if(req.query.email == null || req.params.email == '')
        res.json({status: 'email is require'});
    var bar = {
        status: 'ok',
        barcode_num: genBarcode(),
        email: req.query.email,
    }
    res.json(bar);

    /*
     * todo: add the barcode to the database
    */

    res.end();
    console.log('responsed!')
};

function genBarcode() {
    var result = '593040';  // start with 593040
    result += randMinMax(0,99999999).toString();  // random another 8 digits

    /* todo: check if there's have the number or not */

    return result;
}

function randMinMax(min, max) {
    return Math.floor((Math.random() * (max-min+1)) + min);
}