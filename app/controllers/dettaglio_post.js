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

	var diffTime = moment().diff(attrs.referenceTime, 'days');

	attrs.catImage = ((_.isNull(attrs.category)) || (_.isNull(attrs.category.code)) ) ? '/images/android-robot.jpg' : '/images/cat_' + attrs.category.code.slice(0, 2) + ".png";
	Ti.API.info("DETTAGLIO CAT IMAGE: " + attrs.catImage);
	attrs.postDate = (diffTime > 1) ? moment(attrs.referenceTime).format('LL') : moment(attrs.referenceTime).fromNow();
	attrs.categoria = (!_.isNull(attrs.category)) ? attrs.category.name : "";

	attrs.tag = (_.isNull(attrs.tags)) ? "" : attrs.tags[0].name;
	
	attrs.iconEvent = checkAspects(attrs.aspects, "EVENTDATATYPE_CODE").icona;
	attrs.iconCashFlow = checkAspects(attrs.aspects, "CASHFLOWDATATYPE_CODE").icona;
	attrs.iconDocument = checkAspects(attrs.aspects, "FILEDOCUMENTDATATYPE_CODE").icona;
	attrs.iconNote = checkAspects(attrs.aspects, "NOTEDATATYPE_CODE").icona;
	attrs.iconLink = checkAspects(attrs.aspects, "FILELINKDATATYPE_CODE").icona;
	attrs.iconCommunication = checkAspects(attrs.aspects, "COMMUNICATIONDATATYPE_CODE").icona;

	return attrs;
};


function scrollendEvent(e) {
	
	Ti.API.info("CURRENT  PAGE: " + e.currentPage);
	
	$.aspect_detail_container.removeAllChildren();
	
	
	//updateIconToolbar();

};

var dettaglioCashflow = Alloy.createController("dettaglio_cashflow").getView();
var dettaglioDocument = Alloy.createController("dettaglio_document").getView();

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



function checkAspects(node, target) {

	var aspettiTrovati = _.filter(node, function(value) {
		return value.kind.code == target;
	});

	//Ti.API.info("ASP TROVATI: "+JSON.stringify(aspettiTrovati));

	if (_.isUndefined(node) || aspettiTrovati.length == 0) {

		switch(target) {
		case "EVENTDATATYPE_CODE":
			return ( {
				icona : '/images/kernel-event-off.png',
				tipoAspetto: "EVENTDATATYPE_CODE"
			});
			break;
		case "CASHFLOWDATATYPE_CODE":
			return ( {
				icona : '/images/kernel-finance-off.png',
				tipoAspetto: "CASHFLOWDATATYPE_CODE"
			});
			break;
		case "FILEDOCUMENTDATATYPE_CODE":
			return ( {
				icona : '/images/kernel-document-off.png',
				tipoAspetto: "FILEDOCUMENTDATATYPE_CODE"
			});
			break;
		case "NOTEDATATYPE_CODE":
			return ( {
				icona : '/images/kernel-note-off.png',
				tipoAspetto: "NOTEDATATYPE_CODE"
			});
			break;
		case "FILELINKDATATYPE_CODE":
			return ( {
				icona : '/images/kernel-link-off.png',
				tipoAspetto: "FILELINKDATATYPE_CODE"
			});
			break;
		case "COMMUNICATIONDATATYPE_CODE":
			return ( {
				icona : '/images/kernel-comunicazioni-off.png',
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
				icona : '/images/kernel-event-on.png',
				tipoAspetto: "EVENTDATATYPE_CODE",
				arrayAspetti: aspettiTrovati,
				numero : aspettiTrovati.length
			});
			break;
		case "CASHFLOWDATATYPE_CODE":
			return ( {
				icona : '/images/kernel-finance-on.png',
				tipoAspetto: "CASHFLOWDATATYPE_CODE",
				arrayAspetti: aspettiTrovati,
				numero : aspettiTrovati.length
			});
			break;
		case "FILEDOCUMENTDATATYPE_CODE":
			return ( {
				icona : '/images/kernel-document-on.png',
				tipoAspetto: "FILEDOCUMENTDATATYPE_CODE",
				arrayAspetti: aspettiTrovati,
				numero : aspettiTrovati.length
			});
			break;
		case "NOTEDATATYPE_CODE":
			return ( {
				icona : '/images/kernel-note-on.png',
				tipoAspetto: "NOTEDATATYPE_CODE",
				arrayAspetti: aspettiTrovati,
				numero : aspettiTrovati.length
			});
			break;
		case "FILELINKDATATYPE_CODE":
			return ( {
				icona : '/images/kernel-link-on.png',
				tipoAspetto: "FILELINKDATATYPE_CODE",
				arrayAspetti: aspettiTrovati,
				numero : aspettiTrovati.length
			});
			break;
		case "COMMUNICATIONDATATYPE_CODE":
			return ( {
				icona : '/images/kernel-comunicazioni-on.png',
				tipoAspetto: "COMMUNICATIONDATATYPE_CODE",
				arrayAspetti: aspettiTrovati,
				numero : aspettiTrovati.length
			});
			break;
		default:
			return;
		}
	}

};

$.dettaglio_post_win.addEventListener("close", function(){
	//$.scrollableCashflow.removeAllChildren();

    $.destroy();
});

