var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSlipSchema = new Schema({
    date_time: {
        type: Number,
        required: 'date time missing'
    },
    slip_id: {
        type: String,
        required: 'slip id missing'
    },
    total_price: {
        type: Number,
        required: 'total price missing'
    }
});

var userFavSchema = new Schema({
    sid: {
        type: String,
        required: 'slip id missing'
    }
});

var userSchema = new Schema({
    _id: {
        type: String,
        required: 'Must have objectId'
    },
    barcode: {
        type: String,
        required: 'barcode missing'
    },
    email: {
        type: String,
        required: 'email missing'
    },
    slip: [userSlipSchema],
    fav: [userFavSchema]
});

module.exports = mongoose.model('userData', userSchema);