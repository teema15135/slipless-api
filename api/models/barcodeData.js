var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var barcodeSchema = new Schema({
    _id: {
        type: String,
        required: 'Must have objectId'
    },
    uid: {
        type: String,
        required: 'Must have udi'
    }
});

module.exports = mongoose.model('barcodeData', barcodeSchema);