var args = arguments[0] || {};



Ti.API.info("PARAMETRI: " + JSON.stringify(args));

var tools = require("utility");

var selectedCategory = null;

var note_time = +moment();

var jsonNoteTemplate = Alloy.Models.Note_template.toJSON();

Ti.API.info("_____|||||| | TEMPLATE NOTE: "+JSON.stringify(jsonNoteTemplate));

function doOpen() {

	$.titolo_nota.value = args.p_titolo;
	
	$.note_date.text = "Data: " + moment().format("LL") + " alle ore " + moment().format("HH:mm");

	if (OS_ANDROID) {

		var activity = $.insermiento_nota.activity;
		/*
		abx.setBackgroundColor("white");
		activity.actionBar.displayHomeAsUp = true;
		abx.setHomeAsUpIcon("/images/logo.png");
		*/
		
		var settings = null;
		var nuovo_post = null;

		
		activity.onCreateOptionsMenu = function(e) {

			salva_nota = e.menu.add({
				//itemId : "PHOTO",
				title : "Salva Nota",
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
				icon : Ti.Android.R.drawable.ic_menu_save
			});

			salva_nota.addEventListener("click", function(e) {
				Alloy.Globals.loading.show("Saving...");

				updateNoteTemplate();
			});

		};

		activity.invalidateOptionsMenu();

	}

};

function updateNoteTemplate() {

	//jsonNoteTemplate.id = null;
	jsonNoteTemplate.name = args.p_titolo;
	jsonNoteTemplate.description = args.p_titolo;
	jsonNoteTemplate.referenceTime = +moment(args.p_reference_time);
	jsonNoteTemplate.category = args.p_categoria;//jsonNoteTemplate.status = "NONE";
	

	jsonNoteTemplate.data.title = $.titolo_nota.value;
	jsonNoteTemplate.data.content = $.note_body.value;
	jsonNoteTemplate.data.timestamp = note_time;
	

	
	Alloy.Globals.loading.hide();
	//Alloy.Collections.Timeline.unshift(response);
	Ti.API.info("NOTA DA AGGIUNGERE: "+JSON.stringify(jsonNoteTemplate));
	$.insermiento_nota.close();
	args._callback(JSON.stringify(jsonNoteTemplate));

}

function openDateTimeSelector() {

	var date_time_pickers = Alloy.createController("date_time_selector", function(o) {

		//Ti.API.info("DATA SELEZIONATA: " + moment(o).format("LLL"));
		$.note_date.text = "Inizia: " + moment(o).format("LL") + " alle ore " + moment(o).format("HH:mm");
		note_time = +moment(o);

	}).getView();

	Alloy.Globals.navMenu.openWindow(date_time_pickers);
}