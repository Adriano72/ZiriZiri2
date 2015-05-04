var args = arguments[0] || {};

var tools = require("utility");
var location = require('getUserLocation');

var selectedLocation = null;
var selectedCategory = null;
var postDate = moment();
var jsonPostTemplate = Alloy.Models.Post_template.toJSON();

var flagAddPostDone = false;

//Ti.API.info("POST TEMPLATE *****: " + JSON.stringify(jsonPostTemplate));

function doOpen() {

	$.location_post.text = "Rilevamento posizione";

	reverseGeocoding();

	if (OS_ANDROID) {

		var activity = $.insermiento_post.activity;
		var settings = null;
		var nuovo_post = null;

		$.orologetto.text = icons.alarm_clock;
		$.map_marker.text = icons.map_marker;

		activity.onCreateOptionsMenu = function(e) {

			salva_post = e.menu.add({
				//itemId : "PHOTO",
				title : "Salva Post",
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
				icon : Ti.Android.R.drawable.ic_menu_save
			});

			salva_post.addEventListener("click", function(e) {
				Alloy.Globals.loading.show("Saving...");

				savePost();
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

function updatePostTemplate() {

	if ($.testo_post.value !== "" && !_.isNull(selectedCategory)) {

		//jsonPostTemplate.id = null;
		jsonPostTemplate.name = $.testo_post.value;
		jsonPostTemplate.category = selectedCategory;
		jsonPostTemplate.description = $.testo_post.value;
		jsonPostTemplate.referenceTime = +moment(postDate);

		//Ti.API.info("JSON POST TEMPLATE: " + JSON.stringify(jsonPostTemplate));

		var _corePostsAddCallback = function(post) {

			flagAddPostDone = true;
			Ti.API.info("ZZ.API.Core.Posts.add success [response : " + JSON.stringify(post) + "]");

		};

		if (!flagAddPostDone) {
			
			Ti.API.info("****** FALSE  ******");

			ZZ.API.Core.Posts.add(jsonPostTemplate, _corePostsAddCallback, function(error) {

				Ti.API.error("ZZ.API.Core.Posts.add error [error : " + error + "]");
			});
		}

	} else {
		Alloy.Globals.loading.hide();
		alert("Il campo Titolo e il campo Categoria sono obbligatori!");
	}

}

function savePost() {

	updatePostTemplate();

	ZZ.API.Core.Post.commit(jsonPostTemplate, function(response) {

		Ti.API.info("ZZ.API.Core.Post.commit success [response : " + JSON.stringify(response) + "]");

		Alloy.Globals.loading.hide();
		//Alloy.Collections.Timeline.unshift(response);
		$.insermiento_post.close();
		args();

	}, function(error) {
		Ti.API.error("ZZ.API.Core.Post.commit error [error : " + JSON.stringify(error) + "]");
	});

}

function openCategoryList() {
	var selectCategory = Alloy.createController("selezione_categoria", function(cat_obj) {

		var categoryLayout = tools.extractCtegoryIcons(cat_obj.code.slice(0, 2));
		$.categoria.text = " " + cat_obj.name + " ";
		$.categoria.backgroundColor = categoryLayout.colore;
		selectedCategory = cat_obj;

	}).getView();

	Alloy.Globals.navMenu.openWindow(selectCategory);
}

function openDateTimeSelector() {
	var date_time_pickers = Alloy.createController("date_time_selector", function(o) {

		//Ti.API.info("DATA SELEZIONATA: " + moment(o).format("LLL"));
		$.data_post.text = moment(o).format("LL") + " alle ore " + moment(o).format("HH:mm");
		postDate = moment(o);

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

			}).getView();

			Alloy.Globals.navMenu.openWindow(cercaIndirizzo);

			break;
		case 3:

			Ti.API.info("CIAO");

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

var _corePostAspectsAddCallback = function(addedAspect) {

	Ti.API.info("ZZ.API.Core.Post.Aspects.add success [response : " + JSON.stringify(addedAspect) + "]");

};

function addEvent() {

	if ($.testo_post.value !== "" && !_.isNull(selectedCategory)) {

		updatePostTemplate();

		var inserisciEvento = Alloy.createController("inserimento_evento", {

			p_titolo : $.testo_post.value,
			p_reference_time : postDate,
			p_categoria : selectedCategory,
			_callback : function(objRet) {
				ZZ.API.Core.Post.Aspects.add(objRet, null, _corePostAspectsAddCallback, function(error) {

					Ti.API.error("ZZ.API.Core.Post.Aspects.add error [error : " + error + "]");
				});
			}
		}).getView();

		Alloy.Globals.navMenu.openWindow(inserisciEvento);

	} else {
		Alloy.Globals.loading.hide();
		alert("Inserire un Titolo e una Categoria prima di aggiungere aspetti al post!");
	}
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

