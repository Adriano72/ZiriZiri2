var args = arguments[0] || {};

var moment = require('alloy/moment');
moment.lang('it', Alloy.Globals.Moment_IT);
moment.lang('it');

Ti.API.info("POST INDEX: " + args.postIndex);



function doOpen() {
	updateCollection();
	var postIndex = args.postIndex;
	$.scrollableTimeline.setCurrentPage(postIndex);
	//updateIconToolbar();
}

function transformData(model) {

	var attrs = model.toJSON();
	
	attrs.catMiniIcon = icons.tags;
	
	Ti.API.info("POST DETTAGLIO: "+JSON.stringify(attrs));

	var diffTime = moment().diff(attrs.referenceTime, 'days');
	
	var categoryLayout = extractCtegoryIcons(attrs.category.code.slice(0, 2));
	attrs.catImage = categoryLayout.icona;
	attrs.cat_color = categoryLayout.colore;

	//attrs.catImage = ((_.isNull(attrs.category)) || (_.isNull(attrs.category.code)) ) ? '/images/android-robot.jpg' : '/images/cat_' + attrs.category.code.slice(0, 2) + ".png";
	//Ti.API.info("DETTAGLIO CAT IMAGE: " + attrs.catImage);
	attrs.postDate = (diffTime > 1) ? moment(attrs.referenceTime).format('LL') + " alle ore "+moment(attrs.referenceTime).format("HH:mm") : moment(attrs.referenceTime).fromNow();
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


function scrollendEvent(e) {
	
	Ti.API.info("CURRENT  PAGE: " + e.currentPage);
	
	$.aspect_detail_container.removeAllChildren();
	
	
	//updateIconToolbar();

};

var dettaglioCashflow = Alloy.createController("dettaglio_cashflow").getView();
var dettaglioDocument = Alloy.createController("dettaglio_document").getView();
var dettaglioNote = Alloy.createController("dettaglio_note").getView();
var dettaglioLink = Alloy.createController("dettaglio_link").getView();


function dettEvento(){
	
	$.aspect_detail_container.removeAllChildren();
	
	Alloy.Models.Post.set(Alloy.Collections.Timeline.at($.scrollableTimeline.currentPage));
	
	var modJson = Alloy.Models.Post.toJSON();
	
	Ti.API.info("MODJSON E VENTO: "+JSON.stringify(modJson));
	
	var aspettoEvento = _.find(modJson.aspects, function(value) {
		return value.kind.code == "EVENTDATATYPE_CODE";
	});
	
	Alloy.Collections.aspettoEvento.reset(aspettoEvento);
	
	var dettaglioEvento = Alloy.createController("dettaglio_evento").getView();
	
	
	$.aspect_detail_container.add(dettaglioEvento);
	//var dettaglioDocument = Alloy.createController("dettaglio_document").getView();
	
}

function dettCashflow(){
	
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

function dettDocument(){
	
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

function dettNote(){
	
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

function dettLink(){
	
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
				largh: 0,
				leftSize: 0,
				tipoAspetto: "EVENTDATATYPE_CODE"
			});
			break;
		case "CASHFLOWDATATYPE_CODE":
			return ( {
				icona : "",
				largh: 0,
				leftSize: 0,
				tipoAspetto: "CASHFLOWDATATYPE_CODE"
			});
			break;
		case "FILEDOCUMENTDATATYPE_CODE":
			return ( {
				icona : "",
				largh: 0,
				leftSize: 0,
				tipoAspetto: "FILEDOCUMENTDATATYPE_CODE"
			});
			break;
		case "NOTEDATATYPE_CODE":
			return ( {
				icona : "",
				largh: 0,
				leftSize: 0,
				tipoAspetto: "NOTEDATATYPE_CODE"
			});
			break;
		case "FILELINKDATATYPE_CODE":
			return ( {
				icona : "",
				largh: 0,
				leftSize: 0,
				tipoAspetto: "FILELINKDATATYPE_CODE"
			});
			break;
		case "COMMUNICATIONDATATYPE_CODE":
			return ( {
				icona : "",
				largh: 0,
				leftSize: 0,
				tipoAspetto: "COMMUNICATIONDATATYPE_CODE"
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
				tipoAspetto: "EVENTDATATYPE_CODE",
				arrayAspetti: aspettiTrovati,
				largh: Ti.UI.SIZE,
				leftSize: 15,
				numero : aspettiTrovati.length
			});
			break;
		case "CASHFLOWDATATYPE_CODE":
			return ( {
				icona : icons.credit_card,
				tipoAspetto: "CASHFLOWDATATYPE_CODE",
				arrayAspetti: aspettiTrovati,
				largh: Ti.UI.SIZE,
				leftSize: 15,
				numero : aspettiTrovati.length
			});
			break;
		case "FILEDOCUMENTDATATYPE_CODE":
			return ( {
				icona : icons.paper_clip,
				tipoAspetto: "FILEDOCUMENTDATATYPE_CODE",
				arrayAspetti: aspettiTrovati,
				largh: Ti.UI.SIZE,
				leftSize: 15,
				numero : aspettiTrovati.length
			});
			break;
		case "NOTEDATATYPE_CODE":
			return ( {
				icona : icons.edit,
				tipoAspetto: "NOTEDATATYPE_CODE",
				arrayAspetti: aspettiTrovati,
				largh: Ti.UI.SIZE,
				leftSize: 15,
				numero : aspettiTrovati.length
			});
			break;
		case "FILELINKDATATYPE_CODE":
			return ( {
				icona : icons.link,
				tipoAspetto: "FILELINKDATATYPE_CODE",
				arrayAspetti: aspettiTrovati,
				largh: Ti.UI.SIZE,
				leftSize: 15,
				numero : aspettiTrovati.length
			});
			break;
		case "COMMUNICATIONDATATYPE_CODE":
			return ( {
				icona : icons.envelope,
				tipoAspetto: "COMMUNICATIONDATATYPE_CODE",
				arrayAspetti: aspettiTrovati,
				largh: Ti.UI.SIZE,
				leftSize: 15,
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

$.dettaglio_post_win.addEventListener("close", function(){
	//$.scrollableCashflow.removeAllChildren();

    $.destroy();
});

