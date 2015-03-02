var args = arguments[0] || {};

var moment = require('alloy/moment');
moment.lang('it', Alloy.Globals.Moment_IT);
moment.lang('it');

var modJson = Alloy.Models.Post.toJSON();

modJson.tmp_referenceTime = moment(Alloy.Models.Post.get("referenceTime")).format('LL');

modJson.categoria = (!_.isNull(modJson.category) ? modJson.category.name : "");

var rating = Alloy.Models.Post.get("rating");
//Alloy.Models.Post.set("catImage", (!_.isNull(modJson.category.code)) ? '/images/' + modJson.category.code.slice(0, 2) + ".png" : '/images/android-robot.jpg');
modJson.catImage = (!_.isNull(modJson.category)) ? '/images/cat_' + modJson.category.code.slice(0, 2) + ".png" : '/images/android-robot.jpg';
Alloy.Models.Post.set("rating_1", (rating > 0) ? "/images/star-small.png" : "");
Alloy.Models.Post.set("rating_2", (rating > 1) ? "/images/star-small.png" : "");
Alloy.Models.Post.set("rating_3", (rating > 2) ? "/images/star-small.png" : "");
Alloy.Models.Post.set("rating_4", (rating > 3) ? "/images/star-small.png" : "");
Alloy.Models.Post.set("rating_5", (rating > 4) ? "/images/star-small.png" : "");

modJson.aspects_event = checkAspects(modJson.aspects, "EVENTDATATYPE_CODE");
modJson.aspects_cashFlow = checkAspects(modJson.aspects, "CASHFLOWDATATYPE_CODE");
modJson.aspects_document = checkAspects(modJson.aspects, "FILEDOCUMENTDATATYPE_CODE");
modJson.aspects_note = checkAspects(modJson.aspects, "NOTEDATATYPE_CODE");
modJson.aspects_link = checkAspects(modJson.aspects, "FILELINKDATATYPE_CODE");
modJson.aspects_communication = checkAspects(modJson.aspects, "COMMUNICATIONDATATYPE_CODE");



$.data_post.text = modJson.tmp_referenceTime;
$.titolo.text = modJson.name;
$.category.text = modJson.categoria;
$.cat_icon.image = modJson.catImage;

Ti.API.info("ASPETTO: "+JSON.stringify(modJson));

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

function checkAspects(node, target) {
	
	var aspettiTrovati = _.filter(node, function(value) {
		return value.kind.code == target;
	});
	
	Ti.API.info("ASP TROVATI: "+JSON.stringify(aspettiTrovati));

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

