'use strict';

exports.send = function (req, res) {
    console.log('Store :\t\t' + req.body.store.name);       // store name
    console.log('branch:\t\t' + req.body.store.branch);      // store's branch name
    console.log('TAX_ID :\t' + req.body.store.tax_id);   // store's tax id
    console.log('Tel.\t\t' + req.body.store.tele);         // store's telephone
    console.log('REG :\t\t' + req.body.store.reg_id);      // store's reg
    console.log('POS :\t\t' + req.body.pos_no)             // store's pos id
    console.log('Date Time :\t' + req.body.date_time);   // slip date
    console.log();                                      // new line
    req.body.items_data.forEach(item => {               // all item
        console.log(item.num_of_item + '\t' + item.item_name + '\t' + item.item_price);
    });
    console.log('Total price :\t' + req.body.total_price + ' baht');     // total price
    console.log(req.body.items_data.length + ' lists, '                  // total lists and items
        + req.body.total_item + ' items.');
    console.log();                                                      // new line
    console.log('Money :\t\t' + req.body.cash);                            // money gotten
    console.log('Change :\t' + req.body.change);                         // change

    res.json({
        status: "sent successful!"
    })
}