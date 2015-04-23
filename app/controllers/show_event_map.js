var args = arguments[0] || {};

if (OS_ANDROID) {
	//zapImageCache();
	var abx = require('com.alcoapps.actionbarextras');
}

Ti.API.info("********************** MAP DATA: " + JSON.stringify(args));
function doOpen() {

	if (OS_ANDROID) {
		abx.title = args.eventTitle;
	}
}

$.mapview.region = args.mapRegion;
$.mapview.annotations = args.annotat; 