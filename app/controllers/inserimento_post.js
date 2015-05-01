var args = arguments[0] || {};

var tools = require("utility");

function doOpen() {
	
	reverseGeocoding();

	if (OS_ANDROID) {

		var activity = $.insermiento_post.activity;
		var settings = null;
		var nuovo_post = null;
		
		$.orologetto.text = icons.alarm_clock;
		

		activity.onCreateOptionsMenu = function(e) {

			salva_post = e.menu.add({
				//itemId : "PHOTO",
				title : "Salva Post",
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
				icon : Ti.Android.R.drawable.ic_menu_save
			});

			salva_post.addEventListener("click", function(e) {
				
			});


		};

		activity.invalidateOptionsMenu();

	}

	$.icon_event.text = icons.calendar;
	$.icon_cashflow.text = icons.credit_card;
	$.icon_document.text = icons.paper_clip;
	$.icon_note.text = icons.file_text_alt;
	$.icon_link.text = icons.link;

	$.data_post.text = moment().format("LL") + " alle ore " + moment().format("HH:mm");

};

function openCategoryList() {
	var selectCategory = Alloy.createController("selezione_categoria", function(cat_obj) {
		
		
		var categoryLayout = tools.extractCtegoryIcons(cat_obj.code.slice(0, 2));		
		$.categoria.text = " "+cat_obj.name+" ";
		$.categoria.backgroundColor = categoryLayout.colore;

	}).getView();
	
	Alloy.Globals.navMenu.openWindow(selectCategory);
}

function openDateTimeSelector() {
	var date_time_pickers = Alloy.createController("date_time_selector", function(o) {
		
		//Ti.API.info("DATA SELEZIONATA: " + moment(o).format("LLL"));
		$.data_post.text = moment(o).format("LL") + " alle ore " + moment(o).format("HH:mm");
		
	}).getView();
	Alloy.Globals.navMenu.openWindow(date_time_pickers);
}

function reverseGeocoding() {

	var u_location = require('getUserLocation');

	u_location.reverseGeo(function(locationData) {

		//args(locationData);
		
		Ti.API.info("LOCATION DATA: "+ JSON.stringify(locationData));
		
		
		
		//$.window.close();

		//Ti.API.info("RESULT LOCATION: " + JSON.stringify(locationData));
	});

};

function addEvent() {

}

function addCashflow() {

}

function addDocument() {

}

function addNote() {

}

function addLink() {

}

function select_date_time() {

}

