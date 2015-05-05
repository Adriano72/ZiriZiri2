var args = arguments[0] || {};

Ti.API.info("PARAMETRI: " + JSON.stringify(args));

var tools = require("utility");
var location = require('getUserLocation');

var selectedLocation = null;
var selectedCategory = null;
var dataInizio = moment();
var dataFine = null;
var jsonEventTemplate = Alloy.Models.Event_template.toJSON();

function doOpen() {

	$.titolo_evento.value = args.p_titolo;
	$.location_post.text = "Rilevamento posizione";
	$.start_date.text = "Inizia: " + moment().format("LL") + " alle ore " + moment().format("HH:mm");
	$.end_date.text = "Finisce...";

	reverseGeocoding();

	if (OS_ANDROID) {

		var activity = $.insermiento_evento.activity;
		var settings = null;
		var nuovo_post = null;

		$.start_orologetto.text = icons.calendar_empty;
		$.end_orologetto.text = icons.calendar_empty;
		$.map_marker.text = icons.map_marker;

		activity.onCreateOptionsMenu = function(e) {

			salva_evento = e.menu.add({
				//itemId : "PHOTO",
				title : "Salva Evento",
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
				icon : Ti.Android.R.drawable.ic_menu_save
			});

			salva_evento.addEventListener("click", function(e) {
				Alloy.Globals.loading.show("Saving...");

				updateEventTemplate();
			});

		};

		activity.invalidateOptionsMenu();

	}

};

function updateEventTemplate() {

	//jsonEventTemplate.id = null;
	jsonEventTemplate.name = args.p_titolo;
	jsonEventTemplate.description = $.titolo_evento.value;
	jsonEventTemplate.referenceTime = +moment(args.p_reference_time);
	jsonEventTemplate.category = args.p_categoria;
	//jsonEventTemplate.status = "NONE";
	jsonEventTemplate.data = {
		"owner" : null,
		"title" : null,
		"type" : "NONE",
		"priority" : "LOW",
		"repeatPeriod" : "NONE",
	};
	jsonEventTemplate.data.startTime = {
		"type" : "NONE",
		"id" : null
	};
	jsonEventTemplate.data.endTime = {
		"type" : "NONE",
		"id" : null
	};
	jsonEventTemplate.data.title = $.titolo_evento.value;
	jsonEventTemplate.data.description = "";

	jsonEventTemplate.location = selectedLocation ? {
		name : selectedLocation.address,
		description : selectedLocation.address,
		latitude : selectedLocation.latitude,
		longitude : selectedLocation.longitude

	} : null;

	jsonEventTemplate.data.startTime.time = +moment(dataInizio);

	if (!_.isNull(dataFine)) {
		jsonEventTemplate.data.endTime = {
			time : +moment(dataFine),
			type : "NONE",
			id : null
		};
	}else{
		jsonEventTemplate.data.endTime = null;
	}

	Alloy.Globals.loading.hide();
	//Alloy.Collections.Timeline.unshift(response);
	Ti.API.info("EVENTO DA AGGIUNGERE: "+JSON.stringify(jsonEventTemplate));
	$.insermiento_evento.close();
	args._callback(jsonEventTemplate);

}

function openStartDateTimeSelector() {

	var date_time_pickers = Alloy.createController("date_time_selector", function(o) {

		//Ti.API.info("DATA SELEZIONATA: " + moment(o).format("LLL"));
		$.start_date.text = "Inizia: " + moment(o).format("LL") + " alle ore " + moment(o).format("HH:mm");
		dataInizio = moment(o);

	}).getView();

	Alloy.Globals.navMenu.openWindow(date_time_pickers);
}

function openEndDateTimeSelector() {

	var date_time_pickers = Alloy.createController("date_time_selector", function(o) {

		//Ti.API.info("DATA SELEZIONATA: " + moment(o).format("LLL"));
		$.end_date.text = "Finisce: " + moment(o).format("LL") + " alle ore " + moment(o).format("HH:mm");
		dataFine = moment(o);

	}).getView();

	Alloy.Globals.navMenu.openWindow(date_time_pickers);
}

function openLocationSelector() {
	$.opzioni_posizione.show();
}

function loactionSelected(e) {
	Ti.API.info(JSON.stringify(e));
	if (!e.button) {
		switch(e.source.selectedIndex) {
		case 0:

			Ti.API.info("CIAO");

			break;
		case 1:

			Ti.API.info("LUOGHI");

			break;
		case 2:

			var cercaIndirizzo = Alloy.createController("search_address", function(location_obj) {

				selectedLocation = location_obj;
				$.location_post.text = selectedLocation.address;
				$.opzioni_posizione.title = selectedLocation.address;
				//$.map_snapshot.image = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'mapSnapshot.png');

			}).getView();

			Alloy.Globals.navMenu.openWindow(cercaIndirizzo);

			break;
		case 3:

			Ti.API.info("RIMUOVI");
			selectedLocation = null;
			$.location_post.text = "Posizione non specificata";
			$.opzioni_posizione.title = "Posizione non specificata";

			break;

		}
	}
}

function reverseGeocoding() {

	location.reverseGeo(function(locationData) {

		//args(locationData);

		Ti.API.info("LOCATION. DATA: " + JSON.stringify(locationData));

		$.location_post.text = locationData.address;
		$.opzioni_posizione.title = locationData.address;
		selectedLocation = locationData;

		//$.window.close();

		//Ti.API.info("RESULT LOCATION: " + JSON.stringify(locationData));
	});

};
