var args = arguments[0] || {};

var moment = require('alloy/moment');
moment.lang('it', Alloy.Globals.Moment_IT);
moment.lang('it');

function doOpen(){
	Alloy.Globals.navMenu = $.navWin;
	Alloy.Globals.loading.show("Caricamento");	
}

function layoutComplete(){
	Alloy.Globals.loading.hide();
}

function checkAspects(node, target) {
	
	var aspettiTrovati = _.filter(node, function(value) {
		return value.kind.code == target;
	});

	if (_.isUndefined(node) || _.isUndefined(aspettiTrovati)) {

		return(null);

	} else {

		switch(target) {
		case "EVENTDATATYPE_CODE":
			return (
				{
					icona: '/images/kernel-event-on.png',
					numero: aspettiTrovati.length
				});
			break;
		case "CASHFLOWDATATYPE_CODE":
			return (
				{
					icona: '/images/kernel-finance-on.png.png',
					numero: aspettiTrovati.length
				});
			break;
		case "FILEDOCUMENTDATATYPE_CODE":
			return (
				{
					icona: '/images/kernel-document-on.png',
					numero: aspettiTrovati.length
				});
			break;
		case "NOTEDATATYPE_CODE":
			return (
				{
					icona: '/images/kernel-note-on.png',
					numero: aspettiTrovati.length
				});
			break;
		case "FILELINKDATATYPE_CODE":
			return (
				{
					icona: '/images/kernel-link-on.png',
					numero: aspettiTrovati.length
				});
			break;
		case "COMMUNICATIONDATATYPE_CODE":
			return (
				{
					icona: '/images/kernel-comunicazioni-on.png',
					numero: aspettiTrovati.length
				});
			break;
		default:
			return;
		}
	}

};

function transformData(model) {

	var attrs = model.toJSON();

	var diffTime = moment().diff(attrs.referenceTime, 'days');

	attrs.catImage = ((_.isNull(attrs.category)) || (_.isNull(attrs.category.code)) ) ? '/images/android-robot.jpg' : '/images/cat_' + attrs.category.code.slice(0, 2) + ".png";
	Ti.API.info("CAT IMAGE: "+attrs.catImage);
	attrs.postDate = (diffTime > 1) ? moment(attrs.referenceTime).format('LL') : moment(attrs.referenceTime).fromNow();
	attrs.categoria = (!_.isNull(attrs.category)) ? attrs.category.name : "";


	attrs.rating_1 = (attrs.rating > 0) ? "/images/star-small.png" : "";
	attrs.rating_2 = (attrs.rating > 1) ? "/images/star-small.png" : "";
	attrs.rating_3 = (attrs.rating > 2) ? "/images/star-small.png" : "";
	attrs.rating_4 = (attrs.rating > 3) ? "/images/star-small.png" : "";
	attrs.rating_5 = (attrs.rating > 4) ? "/images/star-small.png" : "";

	attrs.tag = (_.isNull(attrs.tags)) ? "" : attrs.tags[0].name;

	return attrs;
};

function dettaglioEvento(e) {
	
	Alloy.Models.Post.set(Alloy.Collections.Timeline.at(e.itemIndex));
	//Ti.API.info("STATO POST: " + JSON.stringify(Alloy.Models.Post));
	
	var dett_post_win = Alloy.createController("dettaglio_post").getView();
	Alloy.Globals.navMenu.openWindow(dett_post_win);
 
};
