var firebase = require("firebase-admin");

var serviceAccount = require("../path/to/serviceAccountKey");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://sliplessdemo.firebaseio.com"
});


// var ref = firebase.database().ref('USER_DATA');

// ref.once('value').then(function(snapshot) {
//   console.log(snapshot.child('5').val());
// });

var ref = firebase.database().ref('USER_DATA/imuid');




// firebase.database().ref('BARCODE_DATA').push('TheBarcode2');




// firebase.database().ref('BARCODE_DATA').child('59304012345678')
// .once('value').then(function(snapshot) {
//   console.log(snapshot.val());
// });



// var slip = []

// firebase.database().ref('BARCODE_DATA')
//   .once('value').then(function (snapshot) {
//     for(var key in snapshot.val()) {
//       slip.unshift(snapshot.val()[key]);
//     }
//     console.log(slip);
//   });
