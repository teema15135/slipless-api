var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var itemSchema = new Schema({
    item_name: {
        type: String,
        required: 'item name missing'
    },
    item_price: {
        type: Number,
        required: 'item price missing'
    },
    num_of_item: {
        type: Number,
        required: 'num of item missing'
    }
});

var slipSchema = new Schema({
    _id: {
        type: Number,
        required: 'id missing'
    },
    cash: {
        type: Number,
        required: 'cash missing'
    },
    change: {
        type: Number,
        required: 'change missing'
    },
    date_time: {
        type: Number,
        required: 'date missing'
    },
    items_data: [itemSchema],
    pos_no: {
        type: String,
        required: 'pos number missing'
    },
    store: {
        type: Object,
        required: 'store info missing',
        branch: {
            type: String,
            required: 'store branch missing'
        },
        name: {
            type: String,
            required: 'store name missing'
        },
        reg_id: {
            type: String,
            required: 'store reg id missing'
        },
        tax_id: {
            type: String,
            required: 'store tax id missing'
        },
        tele: {
            type: String,
            required: 'store telephone missing'
        }
    },
    total_item: {
        type: Number,
        required: 'total item missing'
    },
    total_price: {
        type: Number,
        required: 'total price missing'
    }
});

module.exports = mongoose.model('slipData', slipSchema);

/*

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var slipSchema = new Schema({
    cash: Number,
    change: Number,
    date_time: Date,
    items_data: Array,
    pos_no: String,
    store: {
        branch: String,
        name: String,
        reg_id: String,
        tax_id: String,
        tele: String
    },
    total_item: Number,
    total_price: Number
});

module.exports = mongoose.model('slipData', slipSchema);
*/