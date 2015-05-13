var args = arguments[0] || {};

//var dispatcher = require('dispatcher');

var lodash = require('lodash');

var moment = require('alloy/moment');
moment.lang('it', Alloy.Globals.Moment_IT);
moment.lang('it');

Ti.API.info("POST INDEX: " + args.postIndex);

var visteAspetti = [];

var blankView = Ti.UI.createView({
	top : 0,
	height : Ti.UI.FILL,
	backgroundColor : "#F5F9FA"
	//backgroundColor : "green"
});

function doOpen() {

	if (OS_ANDROID) {
		
		var activity = $.dettaglio_post_win.activity;
		abx.setBackgroundColor("white");
		activity.actionBar.displayHomeAsUp = true;
		abx.setHomeAsUpIcon("/images/logo.png");
	}
	//updateCollection();
	var postIndex = args.postIndex;
	$.scrollableTimeline.setCurrentPage(postIndex);
	$.scrollableAspects.views = [blankView];

	//setTimeout(function() {

	scrollendEvent(0);
	//}, 500);

}

function updateIconToolbar(post) {

	//Ti.API.info("ICON EVENT_____________: " + JSON.stringify(post));

	$.event_icon.text = post.iconEvent;
	$.event_icon.width = post.iconEventWidth;
	$.event_icon.left = post.iconEventLeft;

	$.cashflow_icon.text = post.iconCashFlow;
	$.cashflow_icon.width = post.iconCashWidth;
	$.cashflow_icon.left = post.iconCashLeft;

	$.document_icon.text = post.iconDocument;
	$.document_icon.width = post.iconDocWidth;
	$.document_icon.left = post.iconDocLeft;

	$.note_icon.text = post.iconNote;
	$.note_icon.width = post.iconNoteWidth;
	$.note_icon.left = post.iconNoteLeft;

	$.link_icon.text = post.iconLink;
	$.link_icon.width = post.iconLinktWidth;
	$.link_icon.left = post.iconLinkLeft;

}

function onAspectChange(tipoAspetto) {

	switch(tipoAspetto) {
	case "EVENTDATATYPE_CODE":
		resetIconColors();
		$.event_icon.backgroundColor = "#545452";
		$.event_icon.color = "#F7F7F2";

		break;
	case "CASHFLOWDATATYPE_CODE":
		resetIconColors();
		$.cashflow_icon.backgroundColor = "#545452";
		$.cashflow_icon.color = "#F7F7F2";

		break;
	case "FILEDOCUMENTDATATYPE_CODE":
		resetIconColors();
		$.document_icon.backgroundColor = "#545452";
		$.document_icon.color = "#F7F7F2";

		break;
	case "NOTEDATATYPE_CODE":
		resetIconColors();
		$.note_icon.backgroundColor = "#545452";
		$.note_icon.color = "#F7F7F2";

		break;
	case "FILELINKDATATYPE_CODE":
		resetIconColors();
		$.link_icon.backgroundColor = "#545452";
		$.link_icon.color = "#F7F7F2";

		break;
	}

	//dispatcher.off('aspectChanged', onAspectChange);
};

function resetIconColors() {
	$.event_icon.color = "#999";
	$.event_icon.backgroundColor = "#D9D9D9";
	$.cashflow_icon.color = "#999";
	$.cashflow_icon.backgroundColor = "#D9D9D9";
	$.document_icon.color = "#999";
	$.document_icon.backgroundColor = "#D9D9D9";
	$.note_icon.color = "#999";
	$.note_icon.backgroundColor = "#D9D9D9";
	$.link_icon.color = "#999";
	$.link_icon.backgroundColor = "#D9D9D9";

}

function jumpToAspectType(aspectType) {
	Ti.API.info("JUMP FUNCTION *************** " + aspectType);

	var indexToGo = lodash.findIndex(sortedArray, function(value) {
		return value.kind.code == aspectType;
	});

	Ti.API.info("INDEX TO GO: " + indexToGo);

	$.scrollableAspects.setCurrentPage(indexToGo);

}

function setToEvent() {
	jumpToAspectType("EVENTDATATYPE_CODE");
};

function setToCashflow() {
	jumpToAspectType("CASHFLOWDATATYPE_CODE");
};

function setToDocument() {
	jumpToAspectType("FILEDOCUMENTDATATYPE_CODE");
};

function setToNote() {
	jumpToAspectType("NOTEDATATYPE_CODE");
};

function setToLink() {
	jumpToAspectType("FILELINKDATATYPE_CODE");
};

var timelineScrollableViews = [];

var sortedArray = [];

Alloy.Collections.Timeline.forEach(function(post) {

	var value = post.toJSON();
	//Ti.API.info("CIAO "+ JSON.stringify(value));

	value.catMiniIcon = icons.tags;

	//Ti.API.info("POST DETTAGLIO: " + JSON.stringify(value));

	var diffTime = moment().diff(value.referenceTime, 'days');

	var categoryLayout = extractCtegoryIcons(value.category.code.slice(0, 2));
	value.catImage = categoryLayout.icona;
	value.cat_color = categoryLayout.colore;

	//value.catImage = ((_.isNull(value.category)) || (_.isNull(value.category.code)) ) ? '/images/android-robot.jpg' : '/images/cat_' + value.category.code.slice(0, 2) + ".png";
	//Ti.API.info("DETTAGLIO CAT IMAGE: " + value.catImage);
	value.postDate = moment(value.referenceTime).format('LL') + " - " + moment(value.referenceTime).format("HH:mm");
	value.categoria = (!_.isNull(value.category)) ? value.category.name : "";

	value.tag = (_.isNull(value.tags)) ? "" : value.tags[0].name;

	var post = Alloy.createController('postDetailSingleView', {
		p_post : value,

	}).getView();

	timelineScrollableViews.push(post);

});

$.scrollableTimeline.views = timelineScrollableViews;
/*
 function transformData(model) {

 var attrs = model.toJSON();

 attrs.catMiniIcon = icons.tags;

 //Ti.API.info("POST DETTAGLIO: " + JSON.stringify(attrs));

 var diffTime = moment().diff(attrs.referenceTime, 'days');

 var categoryLayout = extractCtegoryIcons(attrs.category.code.slice(0, 2));
 attrs.catImage = categoryLayout.icona;
 attrs.cat_color = categoryLayout.colore;

 //attrs.catImage = ((_.isNull(attrs.category)) || (_.isNull(attrs.category.code)) ) ? '/images/android-robot.jpg' : '/images/cat_' + attrs.category.code.slice(0, 2) + ".png";
 //Ti.API.info("DETTAGLIO CAT IMAGE: " + attrs.catImage);
 attrs.postDate = (diffTime > 1) ? moment(attrs.referenceTime).format('LL') + " alle ore " + moment(attrs.referenceTime).format("HH:mm") : moment(attrs.referenceTime).fromNow();
 attrs.categoria = (!_.isNull(attrs.category)) ? attrs.category.name : "";

 attrs.tag = (_.isNull(attrs.tags)) ? "" : attrs.tags[0].name;

 var datiIconaEvento = checkAspects(attrs.aspects, "EVENTDATATYPE_CODE");
 var datiIconaCashflow = checkAspects(attrs.aspects, "CASHFLOWDATATYPE_CODE");
 var datiIconaDocument = checkAspects(attrs.aspects, "FILEDOCUMENTDATATYPE_CODE");
 var datiIconaNote = checkAspects(attrs.aspects, "NOTEDATATYPE_CODE");
 var datiIconaLink = checkAspects(attrs.aspects, "FILELINKDATATYPE_CODE");
 var datiIconaCommunication = checkAspects(attrs.aspects, "COMMUNICATIONDATATYPE_CODE");

 attrs.iconEvent = datiIconaEvento.icona;
 attrs.iconCashFlow = datiIconaCashflow.icona;
 attrs.iconDocument = datiIconaDocument.icona;
 attrs.iconNote = datiIconaNote.icona;
 attrs.iconLink = datiIconaLink.icona;
 attrs.iconCommunication = datiIconaCommunication.icona;

 attrs.iconEventWidth = datiIconaEvento.largh;
 attrs.iconCashWidth = datiIconaCashflow.largh;
 attrs.iconDocWidth = datiIconaDocument.largh;
 attrs.iconNoteWidth = datiIconaNote.largh;
 attrs.iconLinktWidth = datiIconaLink.largh;
 attrs.iconCommWidth = datiIconaCommunication.largh;

 attrs.iconEventLeft = datiIconaEvento.leftSize;
 attrs.iconCashLeft = datiIconaCashflow.leftSize;
 attrs.iconDocLeft = datiIconaDocument.leftSize;
 attrs.iconNoteLeft = datiIconaNote.leftSize;
 attrs.iconLinkLeft = datiIconaLink.leftSize;
 attrs.iconCommLeft = datiIconaCommunication.leftSize;

 return attrs;
 };
 */

function scrollendEvent(e) {

	Ti.API.info("CURRENT  PAGE: " + e.currentPage);
	$.scrollableAspects.setCurrentPage(0);

	//$.aspect_detail_container.removeAllChildren();

	visteAspetti = [];

	Alloy.Models.Post.set(Alloy.Collections.Timeline.at($.scrollableTimeline.currentPage));

	var modJson = Alloy.Models.Post.toJSON();

	var aspettiPost = modJson.aspects;

	// ***** INIZIO - RIORDINA l'ARRAY aSPETTI VISTO CHE DANIELE FANCAZZISTA NON LO FA!!!'

	sortedArray = [];

	var aspettiEvento = _.filter(aspettiPost, function(value) {
		return value.kind.code == "EVENTDATATYPE_CODE";
	});

	if (aspettiEvento.length > 0) {
		sortedArray.push(aspettiEvento);
	};

	var aspettiCashflow = _.filter(aspettiPost, function(value) {
		return value.kind.code == "CASHFLOWDATATYPE_CODE";
	});

	if (aspettiCashflow.length > 0)
		sortedArray.push(aspettiCashflow);

	var aspettiDocument = _.filter(aspettiPost, function(value) {
		return value.kind.code == "FILEDOCUMENTDATATYPE_CODE";
	});

	if (aspettiDocument.length > 0)
		sortedArray.push(aspettiDocument);

	var aspettiNote = _.filter(aspettiPost, function(value) {
		return value.kind.code == "NOTEDATATYPE_CODE";
	});

	if (aspettiNote.length > 0)
		sortedArray.push(aspettiNote);

	var aspettiLink = _.filter(aspettiPost, function(value) {
		return value.kind.code == "FILELINKDATATYPE_CODE";
	});

	if (aspettiLink.length > 0)
		sortedArray.push(aspettiLink);

	sortedArray = _.flatten(sortedArray, true);

	var datiIconaEvento = checkAspects(aspettiPost, "EVENTDATATYPE_CODE");
	var datiIconaCashflow = checkAspects(aspettiPost, "CASHFLOWDATATYPE_CODE");
	var datiIconaDocument = checkAspects(aspettiPost, "FILEDOCUMENTDATATYPE_CODE");
	var datiIconaNote = checkAspects(aspettiPost, "NOTEDATATYPE_CODE");
	var datiIconaLink = checkAspects(aspettiPost, "FILELINKDATATYPE_CODE");
	var datiIconaCommunication = checkAspects(aspettiPost, "COMMUNICATIONDATATYPE_CODE");

	var objIconToolbars = {};

	objIconToolbars.iconEvent = datiIconaEvento.icona;
	objIconToolbars.iconCashFlow = datiIconaCashflow.icona;
	objIconToolbars.iconDocument = datiIconaDocument.icona;
	objIconToolbars.iconNote = datiIconaNote.icona;
	objIconToolbars.iconLink = datiIconaLink.icona;
	objIconToolbars.iconCommunication = datiIconaCommunication.icona;

	objIconToolbars.iconEventWidth = datiIconaEvento.largh;
	objIconToolbars.iconCashWidth = datiIconaCashflow.largh;
	objIconToolbars.iconDocWidth = datiIconaDocument.largh;
	objIconToolbars.iconNoteWidth = datiIconaNote.largh;
	objIconToolbars.iconLinktWidth = datiIconaLink.largh;
	objIconToolbars.iconCommWidth = datiIconaCommunication.largh;

	objIconToolbars.iconEventLeft = datiIconaEvento.leftSize;
	objIconToolbars.iconCashLeft = datiIconaCashflow.leftSize;
	objIconToolbars.iconDocLeft = datiIconaDocument.leftSize;
	objIconToolbars.iconNoteLeft = datiIconaNote.leftSize;
	objIconToolbars.iconLinkLeft = datiIconaLink.leftSize;
	objIconToolbars.iconCommLeft = datiIconaCommunication.leftSize;

	updateIconToolbar(objIconToolbars);

	// ***** FINE - RIORDINA l'ARRAY aSPETTI VISTO CHE DANIELE FANCAZZISTA NON LO FA!!!'

	//Ti.API.info("******* SORTED ARRAY: " + JSON.stringify(sortedArray));

	//$.scrollableAspects.views = [];

	_.each(sortedArray, function(value, key) {

		switch(value.kind.code) {
		case "EVENTDATATYPE_CODE":

			var aspetto = Alloy.createController('dettaglio_evento', {
				_callback : function() {
					Ti.API.info("Ciao");
				},
				p_aspetto : value,
			}).getView();

			visteAspetti.push(aspetto);

			break;

		case "CASHFLOWDATATYPE_CODE":

			var aspetto = Alloy.createController('dettaglio_cashflow', {
				_callback : function() {
					Ti.API.info("Ciao");
				},
				p_aspetto : value,
			}).getView();

			visteAspetti.push(aspetto);

			break;

		case "FILEDOCUMENTDATATYPE_CODE":

			var aspetto = Alloy.createController('dettaglio_document', {
				_callback : function() {
					Ti.API.info("Ciao");
				},
				p_aspetto : value,
			}).getView();

			visteAspetti.push(aspetto);

			break;

		case "NOTEDATATYPE_CODE":

			var aspetto = Alloy.createController('dettaglio_note', {
				_callback : function() {
					Ti.API.info("Ciao");
				},
				p_aspetto : value,
			}).getView();

			visteAspetti.push(aspetto);

			break;

		case "FILELINKDATATYPE_CODE":

			var aspetto = Alloy.createController('dettaglio_link', {
				_callback : function() {
					Ti.API.info("Ciao");
				},
				p_aspetto : value,
			}).getView();

			visteAspetti.push(aspetto);

			break;

		default:
			Ti.API.info("######### DEFAULT #########");
			visteAspetti = [blankView];
		}

	});

	if (visteAspetti.length > 0) {

		Ti.API.info("######### >0 #########");
		$.scrollableAspects.views = visteAspetti;
	}

	//setTimeout(function() {
	scrollendEventAspects(0);
	//}, 500);

};

function scrollendEventAspects(e) {

	var indice = e.currentPage || 0;

	if (sortedArray.length > 0) {

		onAspectChange(sortedArray[indice].kind.code || 0);

		//Ti.API.info("@@@@@ ASPETTO SELEZIONATO @@@@@@: " + JSON.stringify(sortedArray[indice]));

		var aspecTypeArray = _.filter(sortedArray, function(value) {
			return value.kind.code == sortedArray[indice].kind.code;
		});

		var indexToGo = lodash.findIndex(aspecTypeArray, function(value) {
			return value.id == sortedArray[indice].id;
		});

		$.aspectNumIndicator.text = (indexToGo + 1) + "/" + aspecTypeArray.length;

		//dispatcher.trigger('aspectChanged', sortedArray[indice].kind.code);

		Ti.API.info("CURRENT  ASPECT INDEX @@@@@@@@@@@: " + sortedArray[indice].kind.code);

	} else {
		$.scrollableAspects.setCurrentPage(0);
		$.aspectNumIndicator.text = "0/0";
		$.scrollableAspects.views = [blankView];
	};

	//$.event_icon.backgroundColor = "red";

	//$.aspect_detail_container.removeAllChildren();

	//updateIconToolbar();

};

/*
 var dettaglioCashflow = Alloy.createController("dettaglio_cashflow").getView();
 var dettaglioDocument = Alloy.createController("dettaglio_document").getView();
 var dettaglioNote = Alloy.createController("dettaglio_note").getView();
 var dettaglioLink = Alloy.createController("dettaglio_link").getView();

 function dettEvento() {

 $.aspect_detail_container.removeAllChildren();

 Alloy.Models.Post.set(Alloy.Collections.Timeline.at($.scrollableTimeline.currentPage));

 var modJson = Alloy.Models.Post.toJSON();

 Ti.API.info("MODJSON E VENTO: " + JSON.stringify(modJson));

 var aspettoEvento = _.find(modJson.aspects, function(value) {
 return value.kind.code == "EVENTDATATYPE_CODE";
 });

 Alloy.Collections.aspettoEvento.reset(aspettoEvento);

 var dettaglioEvento = Alloy.createController("dettaglio_evento").getView();

 $.aspect_detail_container.add(dettaglioEvento);
 //var dettaglioDocument = Alloy.createController("dettaglio_document").getView();

 }

 function dettCashflow() {

 $.aspect_detail_container.removeAllChildren();

 Alloy.Models.Post.set(Alloy.Collections.Timeline.at($.scrollableTimeline.currentPage));

 var modJson = Alloy.Models.Post.toJSON();

 var aspettiCashflow = _.filter(modJson.aspects, function(value) {
 return value.kind.code == "CASHFLOWDATATYPE_CODE";
 });

 Alloy.Collections.aspettiCashflow.reset(aspettiCashflow);

 $.aspect_detail_container.add(dettaglioCashflow);
 //var dettaglioDocument = Alloy.createController("dettaglio_document").getView();

 }

 function dettDocument() {

 $.aspect_detail_container.removeAllChildren();

 Alloy.Models.Post.set(Alloy.Collections.Timeline.at($.scrollableTimeline.currentPage));

 var modJson = Alloy.Models.Post.toJSON();

 var aspDocument = _.filter(modJson.aspects, function(value) {
 return value.kind.code == "FILEDOCUMENTDATATYPE_CODE";
 });

 Alloy.Collections.aspettiDocument.reset(aspDocument);

 $.aspect_detail_container.add(dettaglioDocument);
 //var dettaglioDocument = Alloy.createController("dettaglio_document").getView();

 }

 function dettNote() {

 $.aspect_detail_container.removeAllChildren();

 Alloy.Models.Post.set(Alloy.Collections.Timeline.at($.scrollableTimeline.currentPage));

 var modJson = Alloy.Models.Post.toJSON();

 var aspNote = _.filter(modJson.aspects, function(value) {
 return value.kind.code == "NOTEDATATYPE_CODE";
 });

 Alloy.Collections.aspettiNote.reset(aspNote);

 $.aspect_detail_container.add(dettaglioNote);
 //var dettaglioDocument = Alloy.createController("dettaglio_document").getView();

 }

 function dettLink() {

 $.aspect_detail_container.removeAllChildren();

 Alloy.Models.Post.set(Alloy.Collections.Timeline.at($.scrollableTimeline.currentPage));

 var modJson = Alloy.Models.Post.toJSON();

 var aspLink = _.filter(modJson.aspects, function(value) {
 return value.kind.code == "FILELINKDATATYPE_CODE";
 });

 Alloy.Collections.aspettiLink.reset(aspLink);

 $.aspect_detail_container.add(dettaglioLink);
 //var dettaglioDocument = Alloy.createController("dettaglio_document").getView();

 }
 */

function checkAspects(node, target) {

	var aspettiTrovati = _.filter(node, function(value) {
		return value.kind.code == target;
	});

	//Ti.API.info("ASP TROVATI: "+JSON.stringify(aspettiTrovati));

	if (_.isUndefined(node) || aspettiTrovati.length == 0) {

		switch(target) {
		case "EVENTDATATYPE_CODE":
			return ( {
				icona : "",
				largh : 0,
				leftSize : 0,
				tipoAspetto : "EVENTDATATYPE_CODE"
			});
			break;
		case "CASHFLOWDATATYPE_CODE":
			return ( {
				icona : "",
				largh : 0,
				leftSize : 0,
				tipoAspetto : "CASHFLOWDATATYPE_CODE"
			});
			break;
		case "FILEDOCUMENTDATATYPE_CODE":
			return ( {
				icona : "",
				largh : 0,
				leftSize : 0,
				tipoAspetto : "FILEDOCUMENTDATATYPE_CODE"
			});
			break;
		case "NOTEDATATYPE_CODE":
			return ( {
				icona : "",
				largh : 0,
				leftSize : 0,
				tipoAspetto : "NOTEDATATYPE_CODE"
			});
			break;
		case "FILELINKDATATYPE_CODE":
			return ( {
				icona : "",
				largh : 0,
				leftSize : 0,
				tipoAspetto : "FILELINKDATATYPE_CODE"
			});
			break;
		case "COMMUNICATIONDATATYPE_CODE":
			return ( {
				icona : "",
				largh : 0,
				leftSize : 0,
				tipoAspetto : "COMMUNICATIONDATATYPE_CODE"
			});
			break;
		default:
			return;
		}

	} else {

		switch(target) {
		case "EVENTDATATYPE_CODE":
			return ( {
				icona : icons.calendar,
				tipoAspetto : "EVENTDATATYPE_CODE",
				arrayAspetti : aspettiTrovati,
				largh : 30,
				leftSize : 15,
				numero : aspettiTrovati.length
			});
			break;
		case "CASHFLOWDATATYPE_CODE":
			return ( {
				icona : icons.credit_card,
				tipoAspetto : "CASHFLOWDATATYPE_CODE",
				arrayAspetti : aspettiTrovati,
				largh : 30,
				leftSize : 15,
				numero : aspettiTrovati.length
			});
			break;
		case "FILEDOCUMENTDATATYPE_CODE":
			return ( {
				icona : icons.paper_clip,
				tipoAspetto : "FILEDOCUMENTDATATYPE_CODE",
				arrayAspetti : aspettiTrovati,
				largh : 30,
				leftSize : 15,
				numero : aspettiTrovati.length
			});
			break;
		case "NOTEDATATYPE_CODE":
			return ( {
				icona : icons.file_text_alt,
				tipoAspetto : "NOTEDATATYPE_CODE",
				arrayAspetti : aspettiTrovati,
				largh : 30,
				leftSize : 15,
				numero : aspettiTrovati.length
			});
			break;
		case "FILELINKDATATYPE_CODE":
			return ( {
				icona : icons.link,
				tipoAspetto : "FILELINKDATATYPE_CODE",
				arrayAspetti : aspettiTrovati,
				largh : 30,
				leftSize : 15,
				numero : aspettiTrovati.length
			});
			break;
		case "COMMUNICATIONDATATYPE_CODE":
			return ( {
				icona : icons.envelope,
				tipoAspetto : "COMMUNICATIONDATATYPE_CODE",
				arrayAspetti : aspettiTrovati,
				largh : 30,
				leftSize : 15,
				numero : aspettiTrovati.length
			});
			break;
		default:
			return;
		}
	}

};

function extractCtegoryIcons(code) {

	switch(code) {

	case "01":
		return ( {
			icona : icons.money,
			colore : "#38e8c6"
		});
		break;
	case "03":
		return ( {
			icona : icons.briefcase,
			colore : "#5a9dd0"
		});
		break;
	case "04":
		return ( {
			icona : icons.home,
			colore : "#ffd651"
		});
		break;
	case "05":
		return ( {
			icona : icons.road,
			colore : "#FFDD01"
		});
		break;
	case "06":
		return ( {
			icona : icons.plug,
			colore : "#a6c4bc"
		});
		break;
	case "07":
		return ( {
			icona : icons.stethoscope,
			colore : "#6cc"
		});
		break;
	case "08":
		return ( {
			icona : icons.users,
			colore : "#F44336"
		});
		break;
	case "09":
		return ( {
			icona : icons.sun,
			colore : "#fce295"
		});
		break;
	case "10":
		return ( {
			icona : icons.question_sign,
			colore : "#f8bc7c"
		});
		break;
	case "11":
		return ( {
			icona : icons.camera,
			colore : "#aeaeae"
		});
		break;
	case "12":
		return ( {
			icona : icons.graduation_cap,
			colore : "#0c0"
		});
		break;
	case "13":
		return ( {
			icona : icons.user,
			colore : "#CCEEFF"
		});
		break;
	case "14":
		return ( {
			icona : icons.money,
			colore : "#11BFBC"
		});
		break;
	case "15":
		return ( {
			icona : icons.money,
			colore : "#FF0000"
		});
		break;
	case "16":
		return ( {
			icona : icons.question_sign,
			colore : "#FAEBD7"
		});
		break;
	default:
		return ( {
			icona : icons.question,
			colore : "#ff0000"
		});
		break;

	}

};

$.dettaglio_post_win.addEventListener("close", function() {
	//$.scrollableCashflow.removeAllChildren();

	$.destroy();
});

