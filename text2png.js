var fs = require('fs');
var text2png = require('text2png');

// var slipData = '';

// slipData += '7-Eleven\n' +
//     'อาคารจอดรถ MBA(มข 06172)\n' +
//     'TAX#0107542000011\n' +
//     'POS#E10400000201593\n' +
//     'ใบเสร็จรับเงิน/ใบกำกับภาษีอย่างย่อ\n' +
//     'นมจืดโชคชัยมีวัว\t\t' + '1\t\t' + '24.50\n' +
//     'โอรีโอ\t\t' + '2\t\t' + '10.00\n' +
//     'ยาแก้ไอตราเสือดาว\t\t' + '1\t\t' + '35.00\n';

//'7-Eleven\n5555 MBA(5555 06172)\nTAX#0107542000011\nPOS#E10400000201593\n555/5555\n55555\t\t1\t\t24.50\n5555\t\t2\t\t10.00\n55555\t\t1\t\t35.00\n'

var slipData = '';

slipData += '7-Eleven\n' +
    'MBA(KKU 06172)\n' +
    'TAX#0107542000011\n' +
    'POS#E10400000201593\n' +
    '________________________________________\n' +
    'Dutch Mill Selected\t\t' + '1\t\t' + '24.50 ฿\n' +
    'Oreo\t\t' + '2\t\t' + '10.00 ฿\n' +
    'Cream-O\t\t' + '1\t\t' + '35.00 ฿\n' + 
    '_________________________________________\n' +
    'Total item\t\t' + '4' + '\tTotal Price\t' + '69.50 ฿\n\n' +
    'Tel. 083-287-6664\t' + '14/12/61\t' + '1:38'
    ;

fs.writeFileSync('slipImage.png',
    text2png( slipData, {
        color: 'black',
        font: '10px Mitr',
        localFontPath: './assets/fonts/Mitr-Light.ttf',
        localFontName: 'Mitr',
        backgroundColor: 'white',
        lineSpacing: 10,
        padding: 20,
        borderColor: 'grey',
        borderWidth: 2
    }));