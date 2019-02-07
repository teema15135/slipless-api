'use strict';

var User = require('../models/userData');
var Barcode = require('../models/barcodeData');
var Slip = require('../models/slipData');

var ImageBuilder = require('./imageBuilder');

exports.send = async function (req, res) {

    var input = req.body;   // declare for easier to access

    var items = [];         // initialize empty array
    var num_list = input.items_data.length;
    for (var i = 0; i < num_list; i++) {
        var item = input.items_data[i];
        var obj = {
            item_name: item.item_name,
            item_price: item.item_price,
            num_of_item: item.num_of_item
        }
        items.push(obj);
    }

    console.log(input.coupons.length);
    console.log(input.coupons);
    var hasCoupon = ((input.coupons.length == 0 || input.coupons == null) ? false : true);
    console.log(hasCoupon);

    var timestamp = Number(new Date());
    var slip = {
        _id: timestamp,
        cash: input.cash,
        change: input.change,
        date_time: input.date_time,
        items_data: items,
        pos_no: input.pos_no,
        store: {
            branch: input.store.branch,
            name: input.store.name,
            reg_id: input.store.reg_id,
            tax_id: input.store.tax_id,
            tele: input.store.tele
        },
        total_item: input.total_item,
        total_price: input.total_price
    }

    var coupons = [];
    if (hasCoupon) {
        for(var i = 0; i < input.coupons.length; i++) {
            coupons.push({
                coupon_name: input.coupons[i].name,
                coupon_expire: input.coupons[i].expire,
                coupon_barcode: input.coupons[i].barcode,
                coupon_description: input.coupons[i].description,
                coupon_store: input.store.name
            });
        }
    }

    var input_Barcode = input.UID;

    Barcode.findById(input_Barcode, function (err, bdoc) {
        if (bdoc == null) {
            res.json({
                status: 'unknown'
            });
            return null;
        }

        ImageBuilder.build(slip);

        User.findById(bdoc.uid, function (err, u_doc) {
            // console.log(slip);
            var newSlip = new Slip(slip);
            newSlip.save(function (err, doc) {
                // console.log(timestamp);
                User.updateOne({ _id: bdoc.uid }, {             // push a little silp data
                    $push: {
                        slip: {
                            date_time: input.date_time,
                            slip_id: timestamp,
                            total_price: input.total_price,
                            store_name: input.store.name
                        }
                    }
                }, function (err, docs) {
                });
                User.findOne({ _id: bdoc.uid, "point.point_store_name": input.store.name }, function (err, p_doc) {      // add point
                    if (p_doc == null) {
                        User.updateOne({ _id: bdoc.uid }, {
                            $push: {
                                point: {
                                    point_store_name: input.store.name,
                                    earned_point: input.point
                                }
                            }
                        }, function (err, doc) {
                            console.log('dont have store before');
                        });
                    } else {
                        User.updateOne({ _id: bdoc.uid, "point.point_store_name": input.store.name }, {
                            $inc: {
                                "point.$.earned_point": input.point
                            }
                        }, function(err, doc){
                            console.log(doc);
                        });
                    }
                });
                console.log(coupons);
                User.updateOne({ _id: bdoc.uid }, {
                    $addToSet: {
                        coupon: {
                            $each: coupons
                        }
                    }
                }, function (err, doc) {
                });
                res.json({
                    message: 'ok'
                });
            });
        });
    });
}