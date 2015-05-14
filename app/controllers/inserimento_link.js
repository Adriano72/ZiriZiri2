var args = arguments[0] || {};

Ti.API.info("PARAMETRI: " + JSON.stringify(args));

var selectedCategory = null;

var link_time = +moment();

var jsonLinkTemplate = Alloy.Models.Link_template.toJSON();

Ti.API.info("_____|||||| | TEMPLAcTE LINK: " + JSON.stringify(jsonLinkTemplate));

function doOpen() {

	$.titolo_link.value = args.p_titolo;

	$.link_date.text = "Data: " + moment().format("LL") + " alle ore " + moment().format("HH:mm");

	if (OS_ANDROID) {

		var activity = $.insermiento_link.activity;
		/*
		 abx.setBackgroundColor("white");
		 activity.actionBar.displayHomeAsUp = true;
		 abx.setHomeAsUpIcon("/images/logo.png");
		 */

		var settings = null;
		var nuovo_post = null;

		activity.onCreateOptionsMenu = function(e) {

			salva_link = e.menu.add({
				//itemId : "PHOTO",
				title : "Salva Nota",
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
				icon : Ti.Android.R.drawable.ic_menu_save
			});

			salva_link.addEventListener("click", function(e) {
				Alloy.Globals.loading.show("Saving...");

				updateLinkTemplate();
			});

		};

		activity.invalidateOptionsMenu();

	}

};

function updateLinkTemplate() {

	//jsonNoteTemplate.id = null;
	jsonLinkTemplate.name = args.p_titolo;
	jsonLinkTemplate.description = args.p_titolo;
	jsonLinkTemplate.referenceTime = +moment(args.p_reference_time);
	jsonLinkTemplate.category = args.p_categoria;
	//jsonNoteTemplate.status = "NONE";

	jsonLinkTemplate.data.title = $.titolo_link.value;
	jsonLinkTemplate.data.description = $.titolo_link.value;

	jsonLinkTemplate.data.content.local = $.link_date.value;
	jsonLinkTemplate.data.content.remote = $.link_date.value;

	Alloy.Globals.loading.hide();
	//Alloy.Collections.Timeline.unshift(response);
	Ti.API.info("LINK DA AGGIUNGERE: " + JSON.stringify(jsonLinkTemplate));
	$.insermiento_link.close();
	args._callback(JSON.stringify(jsonLinkTemplate));

}

function prependhttp(e){
	e.source.value = "http://"+e.source.value;
}

function openDateTimeSelector() {

	var date_time_pickers = Alloy.createController("date_time_selector", function(o) {

		//Ti.API.info("DATA SELEZIONATA: " + moment(o).format("LLL"));
		$.link_date.text = "Data: " + moment(o).format("LL") + " alle ore " + moment(o).format("HH:mm");
		link_time = +moment(o);

	}).getView();

	Alloy.Globals.navMenu.openWindow(date_time_pickers);
}