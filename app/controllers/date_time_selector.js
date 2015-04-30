var args = arguments[0] || {};

function doOpen() {
	Ti.API.info("DO OPEN ******");
	/*
	$.date_picker.value = "2014-04-15T12:00:00";
	$.date_picker.minDate = new Date(2009, 0, 1);
	$.date_picker.maxDate = new Date(2014, 11, 31);
	*/
}

function report(e) {
	Ti.API.info('User selsected: ' + e.value);
}

