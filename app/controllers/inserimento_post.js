var args = arguments[0] || {};

var tools = require("utility");
var location = require('getUserLocation');

var selectedLocation = null;
var selectedCategory = null;
var postDate = moment();
var jsonPostTemplate = Alloy.Models.Post_template.toJSON();

var flagAddPostDone = false;

var arrayAspetti = [];

var sortedArray = [];

var aspectTableData = [];

//Ti.API.info("POST TEMPLATE *****: " + JSON.stringify(jsonPostTemplate));

function doOpen() {

	$.location_post.text = "Rilevamento posizione";

	reverseGeocoding();

	if (OS_ANDROID) {

		var activity = $.insermiento_post.activity;
		/*
		 abx.setBackgroundColor("white");
		 activity.actionBar.displayHomeAsUp = true;
		 abx.setHomeAsUpIcon("/images/logo.png");
		 */

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

	//jsonPostTemplate.id = null;
	Ti.API.info("TESTO POST VALUE: " + $.testo_post.value);
	jsonPostTemplate.name = ($.testo_post.value == "") ? "Post inserito il " + moment().format("LL") + " alle ore " + moment().format("HH:mm") : $.testo_post.value;
	if (!_.isNull(selectedCategory)) {
		jsonPostTemplate.category = selectedCategory;
	}
	jsonPostTemplate.description = $.testo_post.value;
	jsonPostTemplate.referenceTime = +moment(postDate);

	//Ti.API.info("JSON POST TEMPLATE: " + JSON.stringify(jsonPostTemplate));

	var _corePostsAddCallback = function(post) {

		flagAddPostDone = true;
		Ti.API.info("ZZ.API.Core.Posts.add success [response : " + JSON.stringify(post) + "]");

	};

	if (!flagAddPostDone) {

		Ti.API.info("****** FALSE ******");

		ZZ.API.Core.Posts.add(jsonPostTemplate, _corePostsAddCallback, function(error) {

			Ti.API.error("ZZ.API.Core.Posts.add error [error : " + error + "]");
		});
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

		var categoryLayout = tools.extractCategoryIcons(cat_obj.code.slice(0, 2));
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

function openCashFlowSelector() {

	$.opzioni_cashflow.show();

}

function openMediaTypeSelector() {

	$.opzioni_media.show();

}

function openSelectedMedia(e) {

	if (!e.button) {
		switch(e.source.selectedIndex) {
		case 0:

			tools.openCamera(function(p_blob) {
				addDocument(p_blob);
			});

			break;
		case 1:

			tools.openGallery(function(p_blob) {
				addDocument(p_blob);
			});

			break;

		}
	}

}

function loactionSelected(e) {

	//Ti.API.info(JSON.stringify(e));
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

function sortAllAspects() {

	sortedArray = [];

	Ti.API.info("ARRAY  ASPETTI: " + JSON.stringify(arrayAspetti));

	var aspettiEvento = _.filter(arrayAspetti, function(value) {
		return value.kind.code == "EVENTDATATYPE_CODE";
	});

	if (aspettiEvento.length > 0) {
		sortedArray.push(aspettiEvento);
	};

	var aspettiCashflow = _.filter(arrayAspetti, function(value) {
		return value.kind.code == "CASHFLOWDATATYPE_CODE";
	});

	if (aspettiCashflow.length > 0)
		sortedArray.push(aspettiCashflow);

	var aspettiDocument = _.filter(arrayAspetti, function(value) {
		return value.kind.code == "FILEDOCUMENTDATATYPE_CODE";
	});

	if (aspettiDocument.length > 0)
		sortedArray.push(aspettiDocument);

	var aspettiNote = _.filter(arrayAspetti, function(value) {
		return value.kind.code == "NOTEDATATYPE_CODE";
	});

	if (aspettiNote.length > 0)
		sortedArray.push(aspettiNote);

	var aspettiLink = _.filter(arrayAspetti, function(value) {
		return value.kind.code == "FILELINKDATATYPE_CODE";
	});

	if (aspettiLink.length > 0)
		sortedArray.push(aspettiLink);

	sortedArray = _.flatten(sortedArray, true);
	renderAspectsTable();
}

function renderAspectsTable() {
	//Ti.API.info("SORTED ARRAY: " + JSON.stringify(sortedArray));

	$.tbl_aspetti.removeAllChildren();
	aspectTableData = [];

	_.forEach(sortedArray, function(value, key) {

		switch(value.kind.code) {
		case "EVENTDATATYPE_CODE":

			var aspetto = Alloy.createController('row_brief_evento', {
				_callback : function() {
					Ti.API.info("Ciao");
				},
				p_aspetto : value,
			}).getView();

			aspectTableData.push(aspetto);

			break;

		case "CASHFLOWDATATYPE_CODE":

			var aspetto = Alloy.createController('row_brief_cashflow', {
				_callback : function() {
					Ti.API.info("Ciao");
				},
				p_aspetto : value,
			}).getView();

			aspectTableData.push(aspetto);

			break;

		case "FILEDOCUMENTDATATYPE_CODE":

			var aspetto = Alloy.createController('row_brief_documento', {
				_callback : function() {
					Ti.API.info("Ciao");
				},
				p_aspetto : value,
			}).getView();

			aspectTableData.push(aspetto);

			break;

		case "NOTEDATATYPE_CODE":

			var aspetto = Alloy.createController('row_brief_nota', {
				_callback : function() {
					Ti.API.info("Ciao");
				},
				p_aspetto : value,
			}).getView();

			aspectTableData.push(aspetto);

			break;

		case "FILELINKDATATYPE_CODE":

			var aspetto = Alloy.createController('row_brief_link', {
				_callback : function() {
					Ti.API.info("Ciao");
				},
				p_aspetto : value,
			}).getView();

			aspectTableData.push(aspetto);

			break;

		}

		$.tbl_aspetti.setData(aspectTableData);

	});
}

function addEvent() {

	var eventoPresente = _.find(arrayAspetti, function(value) {
		return value.kind.code == "EVENTDATATYPE_CODE";
	});

	if (_.isUndefined(eventoPresente)) {

		updatePostTemplate();

		var inserisciEvento = Alloy.createController("inserimento_evento", {

			p_titolo : $.testo_post.value,
			p_reference_time : postDate,
			p_categoria : selectedCategory,
			_callback : function(p_evnt) {

				var tempOBJ = JSON.parse(p_evnt);

				ZZ.API.Core.Post.Aspects.add(tempOBJ, null, function(aspetto) {

					arrayAspetti.push(tempOBJ);
					//Ti.API.info("ARRAY  ASPETTI 2: " + JSON.stringify(arrayAspetti));
					sortAllAspects();
				}, function(error) {
					Ti.API.error("ZZ.API.Core.Post.Aspects.add success [error : " + error + "]");

				});
			}
		}).getView();

		Alloy.Globals.navMenu.openWindow(inserisciEvento);

	} else {
		alert("E' già stato inserito un aspetto evento per questo post!");
	}
}

function addCashflow(e) {
	Ti.API.info("ARRAY ASPETTI 1: " + JSON.stringify(arrayAspetti));
	var tipo_movimento = null;

	if (!e.button) {
		switch(e.source.selectedIndex) {
		case 0:

			tipo_movimento = "Uscita";

			break;
		case 1:

			tipo_movimento = "Entrata";

			break;
		case 2:

			tipo_movimento = "Bancomat";

			break;
		case 3:

			tipo_movimento = "Prelievo";

			break;
		case 4:

			tipo_movimento = "Versamento";

			break;
		case 5:

			tipo_movimento = "Giroconto";

			break;
		}

		updatePostTemplate();

		var inserisciCashflow = Alloy.createController("inserimento_cashflow", {
			p_tipo : tipo_movimento,
			p_titolo : $.testo_post.value,
			p_location : selectedLocation,
			p_reference_time : postDate,
			p_categoria : selectedCategory,
			_callback : function(p_cash) {

				var tempOBJ = JSON.parse(p_cash);

				ZZ.API.Core.Post.Aspects.add(tempOBJ, null, function(aspetto) {

					arrayAspetti.push(tempOBJ);
					//Ti.API.info("ARRAY  ASPETTI 2: " + JSON.stringify(arrayAspetti));
					sortAllAspects();
				}, function(error) {
					//Ti.API.error("ZZ.API.Core.Post.Aspects.add success [error : " + error + "]");

				});
			}
		}).getView();

		Alloy.Globals.navMenu.openWindow(inserisciCashflow);
	}

}

function addDocument(p_image) {

	updatePostTemplate();

	var inserisciDocument = Alloy.createController("inserimento_documento", {
		p_image : p_image,
		p_titolo : $.testo_post.value,
		p_location : selectedLocation,
		p_reference_time : postDate,
		p_categoria : selectedCategory,
		_callback : function(p_doc) {

			var tempOBJ = JSON.parse(p_doc);

			var _allegaDocumento = function(addedAspect) {

				ZZ.API.Files.Attachment.set(addedAspect, p_image, function(response) {
					Ti.API.info("ZZ.API.Files.Attachment.set success");
					arrayAspetti.push(addedAspect);
					sortAllAspects();
				}, function(error) {
					Ti.API.error("ZZ.API.Files.Attachment.set error [error : " + error + "]");
				});
			};

			ZZ.API.Core.Post.Aspects.add(tempOBJ, null, _allegaDocumento, function(error) {

				Ti.API.error("ZZ.API.Core.Post.Aspects.add error [error : " + error + "]");
			});

		}
	}).getView();

	Alloy.Globals.navMenu.openWindow(inserisciDocument);
}

function addNote() {

	updatePostTemplate();

	var inserisciNota = Alloy.createController("inserimento_note", {
		p_titolo : $.testo_post.value,
		p_location : selectedLocation,
		p_reference_time : postDate,
		p_categoria : selectedCategory,
		_callback : function(p_nota) {

			var tempOBJ = JSON.parse(p_nota);

			ZZ.API.Core.Post.Aspects.add(tempOBJ, null, function(aspetto) {
				arrayAspetti.push(tempOBJ);
				sortAllAspects();
			}, function(error) {

				Ti.API.error("ZZ.API.Core.Post.Aspects.add error [error : " + error + "]");
			});

		}
	}).getView();

	Alloy.Globals.navMenu.openWindow(inserisciNota);
}

function addLink() {
	
	updatePostTemplate();

	var inserisciLink = Alloy.createController("inserimento_link", {
		p_titolo : $.testo_post.value,
		p_location : selectedLocation,
		p_reference_time : postDate,
		p_categoria : selectedCategory,
		_callback : function(p_nota) {

			var tempOBJ = JSON.parse(p_nota);

			ZZ.API.Core.Post.Aspects.add(tempOBJ, null, function(aspetto) {
				arrayAspetti.push(tempOBJ);
				sortAllAspects();
			}, function(error) {

				Ti.API.error("ZZ.API.Core.Post.Aspects.add error [error : " + error + "]");
			});

		}
	}).getView();

	Alloy.Globals.navMenu.openWindow(inserisciLink);
}

function select_date_time() {

}

