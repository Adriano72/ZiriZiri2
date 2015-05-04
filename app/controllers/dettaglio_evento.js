var args = arguments[0] || {};

//Ti.API.info("AARGUMENTS: " + JSON.stringify(arguments));

var attrs = args.p_aspetto;

var map_data = {};

args._callback();

attrs.aspect_icon = icons.calendar;

if (_.isNull(attrs.location)) {
	map_data.mapHeight = 0;
	map_data.annotat = [];
	map_data.mapRegion = {
		latitude : 12,
		longitude : 32,
		latitudeDelta : 0.01,
		longitudeDelta : 0.01
	};
	//$.location.height = 0;

} else {
	$.show_map_container.visible = true;
	map_data.mapHeight = 200;
	map_data.eventTitle = attrs.name;
	map_data.eventLocation = attrs.location.name;
	map_data.mapRegion = {
		latitude : attrs.location.latitude,
		longitude : attrs.location.longitude,
		latitudeDelta : 0.01,
		longitudeDelta : 0.01
	};

	map_data.annotat = [Alloy.Globals.Map.createAnnotation({
		latitude : attrs.location.latitude,
		longitude : attrs.location.longitude,
		title : attrs.location.name,
		pincolor : Alloy.Globals.Map.ANNOTATION_RED
	})];
	
	$.location.text = attrs.location.name;
	//attrs.markerTitle = attrs.location.name;
}

if (testExistence(attrs.data.endTime)) {

	if (attrs.data.startTime.time === attrs.data.endTime.time) {
		attrs.dataEvento = "Data " + moment(attrs.data.startTime.time).format("LL") + " alle ore " + moment(attrs.data.startTime.time).format("HH:mm");
	} else {
		attrs.dataEvento = "Inizia " + moment(attrs.data.startTime.time).format("LL") + " alle ore " + moment(attrs.data.startTime.time).format("HH:mm") + "\nFinisce " + moment(attrs.data.endTime.time).format("LL") + " alle ore " + moment(attrs.data.endTime.time).format("HH:mm");
	}

} else {
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
//$.location.text = attrs.eventLocation;
$.show_map_icon.text = icons.map_marker;
$.tipo_evento.text = attrs.tipo_evento;

function openMap() {
	var mappa = Alloy.createController('show_event_map', map_data).getView();
	Alloy.Globals.navMenu.openWindow(mappa);
}

function testExistence(param) {

	return !(_.isUndefined(param) || _.isNull(param));

};
