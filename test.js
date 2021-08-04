var HID = require("node-hid");
HID.setDriverType("libusb");

var devices = HID.devices();
console.log(devices);
// var devices = HID.devices();
// var device = new HID.HID("/dev/hidraw2");
var device = new HID.HID(1155, 22352);
// console.log(device);
setAngle(7, 90);
const hi = device.write([0xf1, 0x1f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xed]);
console.log(hi);
// ready = true;
device.on("data", function (data) {
	console.log(data);
	console.log("ds");
});
// Integer to hexa
function hex8(val) {
	val &= 0xff;
	return val;
}

function setAngle(nb, val) {
	var head = [0xfa, 0xaf];
	// NB	   W/R	 angle
	var tab = [hex8(nb + 1), 0x1, hex8(val), 0x00, 0x00, 0x00];
	sendCmd(head, tab);
}
// Send cmd (header + data) to hid device
function sendCmd(h, d) {
	if (!true) {
		return;
	}

	var tmp = [];
	for (var i = 0; i < h.length; i++) {
		tmp.push(h[i]);
	}
	for (var i = 0; i < d.length; i++) {
		tmp.push(d[i]);
	}
	var sum = 0;
	for (var i = 0; i < d.length; i++) {
		sum += d[i];
	}
	while (sum > 255) {
		sum -= 255;
	}
	tmp.push(sum);
	tmp.push(0xed);

	try {
		device.write(tmp);
	} catch (err) {
		ready = false;
		mod.err(err);
	}
}

/* console.log("Open HID port..");
var device = new HID.HID(1155, 22352);
console.log("Connected");
device.on("data", function (data) {
	//console.log("data : " + data);
	console.log("OK");
});
device.on("error", function (err) {
	console.log("err : " + err);
});
 */

/* var devices = HID.devices();
var deviceInfo = devices.find(function (d) {
	var isTeensy = d.vendorId === 0x0483 && d.productId === 0x5750;
	return isTeensy;
});
console.log(deviceInfo);
if (deviceInfo) {
	var device = new HID.HID(deviceInfo.path);
	// ... use device
}
 */
