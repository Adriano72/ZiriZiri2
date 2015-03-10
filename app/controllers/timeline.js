var args = arguments[0] || {};

var moment = require('alloy/moment');
moment.lang('it', Alloy.Globals.Moment_IT);
moment.lang('it');

function doOpen() {
	Alloy.Globals.navMenu = $.navWin;
	Alloy.Globals.loading.show("Caricamento");
}

function layoutComplete() {
	Alloy.Globals.loading.hide();
}

function f_logout() {
	Alloy.Collections.Timeline.reset();
	Ti.App.Properties.setBool('authenticated', false);

	$.timeline_win.close();
	//Alloy.createController("index").getView().open();
};

function manageClose() {

	var activity = Titanium.Android.currentActivity;
	activity.finish();

};

function checkAspects(node, target) {

	var aspettiTrovati = _.filter(node, function(value) {
		return value.kind.code == target;
	});

	if (_.isUndefined(node) || _.isUndefined(aspettiTrovati)) {

		return (null);

	} else {

		switch(target) {
		case "EVENTDATATYPE_CODE":
			return ( {
				icona : '/images/kernel-event-on.png',
				numero : aspettiTrovati.length
			});
			break;
		case "CASHFLOWDATATYPE_CODE":
			return ( {
				icona : '/images/kernel-finance-on.png.png',
				numero : aspettiTrovati.length
			});
			break;
		case "FILEDOCUMENTDATATYPE_CODE":
			return ( {
				icona : '/images/kernel-document-on.png',
				numero : aspettiTrovati.length
			});
			break;
		case "NOTEDATATYPE_CODE":
			return ( {
				icona : '/images/kernel-note-on.png',
				numero : aspettiTrovati.length
			});
			break;
		case "FILELINKDATATYPE_CODE":
			return ( {
				icona : '/images/kernel-link-on.png',
				numero : aspettiTrovati.length
			});
			break;
		case "COMMUNICATIONDATATYPE_CODE":
			return ( {
				icona : '/images/kernel-comunicazioni-on.png',
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

function transformData(model) {

	var attrs = model.toJSON();

	var diffTime = moment().diff(attrs.referenceTime, 'days');

	//attrs.catImage = ((_.isNull(attrs.category)) || (_.isNull(attrs.category.code)) ) ? '/images/android-robot.jpg' : '/images/cat_' + attrs.category.code.slice(0, 2) + ".png";
	var categoryLayout = extractCtegoryIcons(attrs.category.code.slice(0, 2));
	attrs.catImage = categoryLayout.icona;
	attrs.cat_color = categoryLayout.colore;

	Ti.API.debug("CAT IMAGE: " + categoryLayout.colore);
	attrs.postDate = (diffTime > 1) ? moment(attrs.referenceTime).format('LL') : moment(attrs.referenceTime).fromNow();
	attrs.cat_mini_icon = icons.tags;
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

	var dett_post_win = Alloy.createController("dettaglio_post", {
		postIndex : e.itemIndex
	}).getView();
	Alloy.Globals.navMenu.openWindow(dett_post_win);

};

$.timeline_win.addEventListener("close", function() {

	$.destroy();
});
