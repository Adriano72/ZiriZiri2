var args = arguments[0] || {};

Alloy.Globals.navMenu = $.navWin;

var moment = require('alloy/moment');
moment.lang('it', Alloy.Globals.Moment_IT);
moment.lang('it');

function checkAspects(node, target) {

	if (_.isUndefined(node) || _.isUndefined(_.find(node, function(value) {
		return value.kind.code == target;
	}))) {

		switch(target) {

		case "EVENTDATATYPE_CODE":
			return ('/images/kernel-event-off.png');
			break;
		case "CASHFLOWDATATYPE_CODE":
			return ('/images/kernel-finance-off.png');
			break;
		case "FILEDOCUMENTDATATYPE_CODE":
			return ('/images/kernel-document-off.png');
			break;
		case "NOTEDATATYPE_CODE":
			return ('/images/kernel-note-off.png');
			break;
		case "FILELINKDATATYPE_CODE":
			return ('/images/kernel-link-off.png');
			break;
		case "COMMUNICATIONDATATYPE_CODE":
			return ('/images/kernel-comunicazioni-off.png');
			break;
		default:
			return;
		}

	} else {

		switch(target) {
		case "EVENTDATATYPE_CODE":
			return ('/images/kernel-event-on.png');
			break;
		case "CASHFLOWDATATYPE_CODE":
			return ('/images/kernel-finance-on.png');
			break;
		case "FILEDOCUMENTDATATYPE_CODE":
			return ('/images/kernel-document-on.png');
			break;
		case "NOTEDATATYPE_CODE":
			return ('/images/kernel-note-on.png');
			break;
		case "FILELINKDATATYPE_CODE":
			return ('/images/kernel-link-on.png');
			break;
		case "COMMUNICATIONDATATYPE_CODE":
			return ('/images/kernel-comunicazioni-on.png');
			break;
		default:
			return;
		}
	}

};

function transformData(model) {
	var attrs = model.toJSON();
	//attrs.imageUrl = '/' + attrs.direction + '.png';
	/*
	 if(!_.isNull(attrs.category.code)){
	 Ti.API.info("****** Immagine: "+'/images/'+attrs.category.code.slice(0,2)+".png");
	 };
	 Ti.API.info("CAT LETTA*****: "+JSON.stringify(attrs.category));
	 */

	var diffTime = moment().diff(attrs.referenceTime, 'days');

	attrs.catImage = ((_.isNull(attrs.category)) || (_.isNull(attrs.category.code)) ) ? '/images/android-robot.jpg' : '/images/' + attrs.category.code.slice(0, 2) + ".png";
	Ti.API.info("CAT IMAGE: "+attrs.catImage);
	attrs.postDate = (diffTime > 1) ? moment(attrs.referenceTime).format('LL') : moment(attrs.referenceTime).fromNow();
	attrs.categoria = (!_.isNull(attrs.category)) ? attrs.category.name : "";

	//attrs.iconEvent = (_.find(node, function(value) {return value.kind.code == target;}))

	attrs.iconEvent = checkAspects(attrs.aspects, "EVENTDATATYPE_CODE");
	attrs.iconCashFlow = checkAspects(attrs.aspects, "CASHFLOWDATATYPE_CODE");
	attrs.iconDocument = checkAspects(attrs.aspects, "FILEDOCUMENTDATATYPE_CODE");
	attrs.iconNote = checkAspects(attrs.aspects, "NOTEDATATYPE_CODE");
	attrs.iconLink = checkAspects(attrs.aspects, "FILELINKDATATYPE_CODE");
	attrs.iconCommunication = checkAspects(attrs.aspects, "COMMUNICATIONDATATYPE_CODE");

	//Ti.API.info("TIME DIFFERENCE IN DAYS: "+moment().diff(attrs.referenceTime, 'days'));

	attrs.rating_1 = (attrs.rating > 0) ? "/images/star-small.png" : "";
	attrs.rating_2 = (attrs.rating > 1) ? "/images/star-small.png" : "";
	attrs.rating_3 = (attrs.rating > 2) ? "/images/star-small.png" : "";
	attrs.rating_4 = (attrs.rating > 3) ? "/images/star-small.png" : "";
	attrs.rating_5 = (attrs.rating > 4) ? "/images/star-small.png" : "";

	attrs.tag = (_.isNull(attrs.tags)) ? "" : attrs.tags[0].name;

	return attrs;
}

