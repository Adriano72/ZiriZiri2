var args = arguments[0] || {};

Ti.API.info("EVENTO COLLECTION LENGTH: " + Alloy.Collections.aspettoEvento.length);

//var ImageFactory = require('ti.imagefactory');

Ti.API.info("ASPETTO EVENTO: " + JSON.stringify(Alloy.Collections.aspettoEvento));

var aspetto = Alloy.Collections.aspettoEvento.at(0);

var attrs = aspetto.toJSON();

Ti.API.info("MODELLO STRINGIFYZZAT EVENTO: " + JSON.stringify(attrs));

function transformEvent(model) {

	var attrs = model.toJSON();

	if (_.isNull(attrs.location)) {
		attrs.mapHeight = 0;
		attrs.annotat = [];
		attrs.mapRegion = {
			latitude : 12,
			longitude : 32,
			latitudeDelta : 0.01,
			longitudeDelta : 0.01
		};
		
	} else {
		attrs.mapHeight = 130;
		attrs.eventLocation = attrs.location.name;
		attrs.mapRegion = {
			latitude : attrs.location.latitude,
			longitude : attrs.location.longitude,
			latitudeDelta : 0.01,
			longitudeDelta : 0.01
		};

		attrs.annotat = [Alloy.Globals.Map.createAnnotation({
			latitude : attrs.location.latitude,
			longitude : attrs.location.longitude,
			title: attrs.location.name,
			pincolor : Alloy.Globals.Map.ANNOTATION_RED
		})];
		//attrs.markerTitle = attrs.location.name;
	}

	attrs.dataDa = "Data " + moment(attrs.data.dataScadenza).format("LL");

	if (attrs.data.startTime.time === attrs.data.endTime.time) {
		attrs.dataEvento = "Data " + moment(attrs.data.startTime.time).format("LL") + " alle ore "+moment(attrs.data.startTime.time).format("h:mm a");
	} else {
		attrs.dataEvento = "Inizia " + moment(attrs.data.startTime.time).format("LL") + " alle ore " + moment(attrs.data.startTime.time).format("h:mm a") + "\nFinisce " + moment(attrs.data.endTime.time).format("LL") + " alle ore " + moment(attrs.data.endTime.time).format("h:mm a");
	}

	return attrs;
}

dataResync();

function testExistence(param) {

	return !(_.isUndefined(param) || _.isNull(param));

};
