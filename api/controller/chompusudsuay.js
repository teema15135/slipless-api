'use strict';

var firebase = require('./FirebaseAdmin');

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
    var slip = {
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

    var input_Barcode = input.UID;
    var root = firebase.database();
    var user_email = 'invalid';

    /*
        todo: *done
            check barcode is equal to active barcodes or not
            if it isn't, drop.
            if it is got the email of barcode's user into a variable and got ref of active barcode
    */

    await root.ref('API_DATA').orderByChild('barcode_num').equalTo(input_Barcode)
        .once('child_added').then(function (snapshot) {
            // console.log('Found!');
            // console.log(snapshot.child('email').val());
            user_email = snapshot.child('email').val();
        });

    /* ============================================================== */

    if (user_email == 'invalid') {
        console.log('Slip droped');
    }
    else {
        console.log("Pushing Data to firebase...");
        var slip_ID = root.ref('SLIP_DATA').push(slip).path.pieces_[1]; // push slip data to firebase and got slip id
        console.log("Pushed slip " + slip_ID + " for user barcode " + input_Barcode);

        /*
            todo: *done
                use email to add slip to that user (slip_id, date_time, total_price)
        */

        // admin.database().ref('USER_DATA');
        // ref.push(obj).path.pieces_[1]

        await res.json({
            status: "sent successful!"
        });
    }
}