var args = arguments[0] || {};

//Ti.API.info("AARGUMENTS: " + JSON.stringify(arguments));

var attrs = args.p_aspetto;

args._callback();

attrs.aspect_icon = icons.calendar;

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
	attrs.mapHeight = 200;
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
		title : attrs.location.name,
		pincolor : Alloy.Globals.Map.ANNOTATION_RED
	})];
	//attrs.markerTitle = attrs.location.name;
}

attrs.dataDa = "Data " + moment(attrs.data.dataScadenza).format("LL");

if (testExistence(attrs.data.endTime)) {

	if (attrs.data.startTime.time === attrs.data.endTime.time) {
		attrs.dataEvento = "Data " + moment(attrs.data.startTime.time).format("LL") + " alle ore " + moment(attrs.data.startTime.time).format("HH:mm");
	} else {
		attrs.dataEvento = "Inizia " + moment(attrs.data.startTime.time).format("LL") + " alle ore " + moment(attrs.data.startTime.time).format("HH:mm") + "\nFinisce " + moment(attrs.data.endTime.time).format("LL") + " alle ore " + moment(attrs.data.endTime.time).format("HH:mm");
	}

}else{
	attrs.dataEvento = "Data " + moment(attrs.data.startTime.time).format("LL") + " alle ore " + moment(attrs.data.startTime.time).format("HH:mm");
}

if (attrs.data.type == "NONE") {
	attrs.tipo_evento = "Evento Effettivo";
} else if (attrs.data.type == "PLANNED") {
	attrs.tipo_evento = "Evento Pianificato";
}

//$.img_icon.text = attrs.aspect_icon;
$.titolo.text = attrs.name;
$.dataEvento.text = attrs.dataEvento;
$.location.text = attrs.eventLocation;
$.mapview.height = attrs.mapHeight;
$.mapview.region = attrs.mapRegion;
$.mapview.annotations = attrs.annotat;
$.tipo_evento.text = attrs.tipo_evento;

function testExistence(param) {

	return !(_.isUndefined(param) || _.isNull(param));

};
