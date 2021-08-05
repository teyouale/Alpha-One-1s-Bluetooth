var test = require("./test");

test.connect(1155, 22352);
// test.setAngle(7, 150);
var head = [0xf3, 0x3f];

var x = "Forward2";
var len = test.hex8(10);
var len2 = test.hex8(11);

var x1 = ConvertStringToHex(x);
x1.unshift(len);
// x1.push(len2);

console.log(x1);

test.setAngle(7, 5);
// test.setAngle(5, 5);
test.sendCmd(head, x1);

function ConvertStringToHex(str) {
	var arr = [];
	for (var i = 0; i < str.length; i++) {
		arr[i] = test.hex8(str.charCodeAt(i));
	}
	return arr;
}
// NB	   W/R	 angle
// var tab = [hex8(nb + 1), 0x1, hex8(val), 0x00, 0x00, 0x00];
// sendCmd(head, tab);
// test.freeAll();
// test.sendCmd();
