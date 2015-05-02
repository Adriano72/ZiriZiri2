var args = arguments[0] || {};

var location = require('getUserLocation');

function doOpen() {
	reverseGeocoding();
	$.lente.text = icons.search;
}

function reverseGeocoding() {

	location.reverseGeo(function(locationData) {

		updateDisplay(locationData);

	});

};

function forwardGeocoding() {

	location.forwardGeo($.searchAddress.value, function(locationData) {

		updateDisplay(locationData);

	});

};

function updateDisplay(locationData) {

	//args(locationData);

	$.mapview.removeAllAnnotations();

	var eventMarker = Alloy.Globals.Map.createAnnotation({
		latitude : locationData.latitude,
		longitude : locationData.longitude,
		title : locationData.address,
		pincolor : Alloy.Globals.Map.ANNOTATION_RED
	});

	$.mapview.region = {
		latitude : locationData.latitude,
		longitude : locationData.longitude,
		latitudeDelta : 0.01,
		longitudeDelta : 0.01
	};

	$.mapview.addAnnotation(eventMarker);

	$.posizione.text = locationData.address;
	location_result = locationData;

};

function sceltaPosizione(e){
	
	
	location.pureReverse(e.latitude, e.longitude, function(locationData) {

		updateDisplay(locationData);

	});
	
}

function saveLocation() {

	args(location_result);
	$.searchAddressWin.close();

};