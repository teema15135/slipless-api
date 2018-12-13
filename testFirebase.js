var admin = require("firebase-admin");

var serviceAccount = require("./path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sliplessdemo.firebaseio.com"
});


var obj = {
    date_time: "2018-12-14T03:57:00",
    slip_id: "12345",
    total_price: 30
}

admin.database().ref('USER_DATA/0/slip').push(obj);