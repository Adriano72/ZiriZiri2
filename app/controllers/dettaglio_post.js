var args = arguments[0] || {};

var moment = require('alloy/moment');
moment.lang('it', Alloy.Globals.Moment_IT);
moment.lang('it');

Ti.API.info("POST INDEX: " + args.postIndex);

var postIndex = args.postIndex;

function doOpen(){
	updateCollection();
	$.scrollableTimeline.setCurrentPage(postIndex);
	updateIconToolbar();
}






function transformData(model) {

	var attrs = model.toJSON();

	var diffTime = moment().diff(attrs.referenceTime, 'days');

	attrs.catImage = ((_.isNull(attrs.category)) || (_.isNull(attrs.category.code)) ) ? '/images/android-robot.jpg' : '/images/cat_' + attrs.category.code.slice(0, 2) + ".png";
	Ti.API.info("DETTAGLIO CAT IMAGE: "+attrs.catImage);
	attrs.postDate = (diffTime > 1) ? moment(attrs.referenceTime).format('LL') : moment(attrs.referenceTime).fromNow();
	attrs.categoria = (!_.isNull(attrs.category)) ? attrs.category.name : "";


	attrs.tag = (_.isNull(attrs.tags)) ? "" : attrs.tags[0].name;

	return attrs;
};

function update(){
	Ti.API.info("Ciao*******");
	
}

$.scrollableTimeline.addEventListener("scrollend", function(e){
	Ti.API.info("CURRENT  PAGE: "+e.currentPage);
	updateIconToolbar();
	
});


function updateIconToolbar(){
	
	
	
	$.aspect_icon_toolbar.removeAllChildren();
	
	Alloy.Models.Post.set(Alloy.Collections.Timeline.at($.scrollableTimeline.currentPage));

	var modJson = Alloy.Models.Post.toJSON();

	modJson.aspects_event = checkAspects(modJson.aspects, "EVENTDATATYPE_CODE");
	modJson.aspects_cashFlow = checkAspects(modJson.aspects, "CASHFLOWDATATYPE_CODE");
	modJson.aspects_document = checkAspects(modJson.aspects, "FILEDOCUMENTDATATYPE_CODE");
	modJson.aspects_note = checkAspects(modJson.aspects, "NOTEDATATYPE_CODE");
	modJson.aspects_link = checkAspects(modJson.aspects, "FILELINKDATATYPE_CODE");
	modJson.aspects_communication = checkAspects(modJson.aspects, "COMMUNICATIONDATATYPE_CODE");

	if(modJson.aspects_event){
		var aspect_icon = Ti.UI.createImageView({
			image: modJson.aspects_event.icona,
			left: 10,
			top: 10,
			width: 25,
			height: 25
		});
		$.aspect_icon_toolbar.add(aspect_icon);
	}
	
	if(modJson.aspects_cashFlow){
		var aspect_icon = Ti.UI.createImageView({
			image: modJson.aspects_cashFlow.icona,
			left: 10,
			top: 10,
			width: 25,
			height: 25
		});
		$.aspect_icon_toolbar.add(aspect_icon);
	}
	
	if(modJson.aspects_document){
		var aspect_icon = Ti.UI.createImageView({
			image: modJson.aspects_document.icona,
			left: 10,
			top: 10,
			width: 25,
			height: 25
		});
		$.aspect_icon_toolbar.add(aspect_icon);
	}
	
	if(modJson.aspects_note){
		var aspect_icon = Ti.UI.createImageView({
			image: modJson.aspects_note.icona,
			left: 10,
			top: 10,
			width: 25,
			height: 25
		});
		$.aspect_icon_toolbar.add(aspect_icon);
	}
	
	if(modJson.aspects_link){
		var aspect_icon = Ti.UI.createImageView({
			image: modJson.aspects_link.icona,
			left: 10,
			top: 10,
			width: 25,
			height: 25
		});
		$.aspect_icon_toolbar.add(aspect_icon);
	}
	
	if(modJson.aspects_communication){
		var aspect_icon = Ti.UI.createImageView({
			image: modJson.aspects_communication.icona,
			left: 10,
			top: 10,
			width: 25,
			height: 25
		});
		$.aspect_icon_toolbar.add(aspect_icon);
	}
}

function checkAspects(node, target) {
	
	var aspettiTrovati = _.filter(node, function(value) {
		return value.kind.code == target;
	});
	
	//Ti.API.info("ASP TROVATI: "+JSON.stringify(aspettiTrovati));

	if (_.isUndefined(node) || aspettiTrovati.length == 0) {

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
					icona: '/images/kernel-finance-on.png',
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


