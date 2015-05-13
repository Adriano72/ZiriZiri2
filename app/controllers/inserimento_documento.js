var args = arguments[0] || {};

//Ti.API.info("PARAMETRI : " + JSON.stringify(args));

var tools = require("utility");
var location = require('getUserLocation');

var dataPicture = +moment(args.postDate);
var jsonDocumentTemplate = Alloy.Models.Document_template.toJSON();

function doOpen() {

	$.img_preview.image = args.p_image;
	$.titolo_documento.value = args.p_titolo;
	$.pict_date.text = moment(args.postDate).format("LL") + " alle ore " + moment(args.postDate).format("HH:mm");

	if (OS_ANDROID) {

		var activity = $.insermiento_documento.activity;
		
		abx.setBackgroundColor("white");
		activity.actionBar.displayHomeAsUp = true;
		abx.setHomeAsUpIcon("/images/logo.png");
		
		var settings = null;
		var nuovo_post = null;

		$.orologetto.text = icons.alarm_clock;
		$.immaginina.text = icons.picture;

		activity.onCreateOptionsMenu = function(e) {

			salva_documento = e.menu.add({
				//itemId : "PHOTO",
				title : "Salva Evento",
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
				icon : Ti.Android.R.drawable.ic_menu_save
			});

			salva_documento.addEventListener("click", function(e) {
				Alloy.Globals.loading.show("Saving...");

				updateDocumentTemplate();
			});

		};

		activity.invalidateOptionsMenu();

	}

};

function updateDocumentTemplate() {
	
	jsonDocumentTemplate.name = args.p_titolo;
	jsonDocumentTemplate.description = $.titolo_documento.value;
	jsonDocumentTemplate.referenceTime = +moment(args.p_reference_time);
	jsonDocumentTemplate.category = args.p_categoria;

	jsonDocumentTemplate.name = args.p_titolo;
	jsonDocumentTemplate.description = $.titolo_documento.value;
	jsonDocumentTemplate.referenceTime = +moment(args.p_reference_time);
	jsonDocumentTemplate.category = args.p_categoria;

	jsonDocumentTemplate.data.title = $.titolo_documento.value;
	//jsonDocumentTemplate.data.name = args.p_image.file.name;

	//jsonDocumentTemplate.data.format = "JPG"; //_.last(fileName, 3).toUpperCase();
	jsonDocumentTemplate.data.description = $.titolo_documento.value;
	//jsonDocumentTemplate.data.size = args.p_image.file.size;
	Alloy.Globals.loading.hide();
	$.insermiento_documento.close();
	args._callback(JSON.stringify(jsonDocumentTemplate));

}

function openDateTimeSelector() {

	var date_time_pickers = Alloy.createController("date_time_selector", function(o) {

		//Ti.API.info("DATA SELEZIONATA: " + moment(o).format("LLL"));
		$.pict_date.text = "Inizia: " + moment(o).format("LL") + " alle ore " + moment(o).format("HH:mm");
		dataPicture = moment(o);

	}).getView();

	Alloy.Globals.navMenu.openWindow(date_time_pickers);
}

