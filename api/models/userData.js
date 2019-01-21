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
    },
    store_name: {
        type: String,
        required: 'store name missing'
    }
});

var userFavSchema = new Schema({
    sid: {
        type: String,
        required: 'slip id missing'
    },
    slip_name: {
        type: String,
        default: 'สลิปที่ไม่มีชื่อ'
    }
});

var userPointSchema = new Schema({
    point_store_name: {
        type: String,
        required: 'store name missing'
    },
    earned_point: {
        type: Number,
        required: 'point missing'
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
    fav: [userFavSchema],
    point: [userPointSchema]
});

module.exports = mongoose.model('userData', userSchema);