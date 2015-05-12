// This is a test harness for your module
// You should do something interesting in this harness
// to test out the module and to provide instructions
// to users on how to use it by example.


// open a single window
var win = Ti.UI.createWindow({
	backgroundColor:'white'
});
var label = Ti.UI.createLabel();
win.add(label);
win.open();

// TODO: write your module tests here
var zz_mobile_frontend_api_appcelerator_module_ios = require('ti.zz.api');
Ti.API.info("module is => " + zz_mobile_frontend_api_appcelerator_module_ios);

label.text = zz_mobile_frontend_api_appcelerator_module_ios.example();

Ti.API.info("module exampleProp is => " + zz_mobile_frontend_api_appcelerator_module_ios.exampleProp);
zz_mobile_frontend_api_appcelerator_module_ios.exampleProp = "This is a test value";

if (Ti.Platform.name == "android") {
	var proxy = zz_mobile_frontend_api_appcelerator_module_ios.createExample({
		message: "Creating an example Proxy",
		backgroundColor: "red",
		width: 100,
		height: 100,
		top: 100,
		left: 150
	});

	proxy.printMessage("Hello world!");
	proxy.message = "Hi world!.  It's me again.";
	proxy.printMessage("Hello world!");
	win.add(proxy);
}

