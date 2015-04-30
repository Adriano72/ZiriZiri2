var args = arguments[0] || {};

//
var moment = require('alloy/moment');
moment.lang('it', Alloy.Globals.Moment_IT);
moment.lang('it');

//Ti.API.info("TIMELINE ***: " + JSON.stringify(Alloy.Collections.Timeline));

//Ti.API.info("2222 TIMELINE LENGTH : " + Alloy.Collections.Timeline.length);

function doOpen() {
	//Alloy.Globals.loading.show('Sincronizzazione', false);

	Alloy.Globals.navMenu = $.navWin;

	if (OS_ANDROID) {

		var activity = $.timeline_win.activity;
		var settings = null;
		var nuovo_post = null;

		activity.onCreateOptionsMenu = function(e) {

			nuovo_post = e.menu.add({
				//itemId : "PHOTO",
				title : "Nuovo Post",
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
				icon : Ti.Android.R.drawable.ic_menu_add
			});
			
			nuovo_post.addEventListener("click", function(e) {
				var nuovo_post_win = Alloy.createController("inserimento_post").getView();
				Alloy.Globals.navMenu.openWindow(nuovo_post_win);
			});

			settings = e.menu.add({
				//itemId : "PHOTO",
				title : "Logout",
				showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER
				//icon : Ti.Android.R.drawable.ic_menu_camera
			});

			settings.addEventListener("click", function(e) {
				f_logout();
			});
			
		};
		
		activity.invalidateOptionsMenu();

		
	}

	Alloy.Globals.loading.hide();

	populateListView();

}

function addMorePosts() {
	Ti.API.info("MARKER RAGGIUNTO !!!!!!!!!!!");

	ZZ.API.Core.Posts.list(function(posts) {
		//Ti.API.info("ZZ.API.Core.Posts.list success [response : " + JSON.stringify(posts) + "]");
		Ti.API.info("@@@@@@@@@@@@ TIMELINE LENGHT " + Alloy.Collections.Timeline.length);
		Ti.API.info("@@@@@@@@@@@@ MORE POST LENGHT " + posts.length);
		Alloy.Collections.Timeline.add(posts);
		Alloy.Collections.Timeline.on("sync", populateListView());
		//Ti.API.info("TIMELINE : " + JSON.stringify(Alloy.Collections.Timeline));

	}, function(error) {
		Ti.API.error("ZZ.API.Core.Posts.list error [error : " + error + "]");
		Alloy.Globals.loading.hide();
	}, {
		action : ZZ.API.Core.Posts.CONSTANTS.ACTIONS.LOAD_MORE
	});

}

function populateListView() {
	Ti.API.info(" ******** POPULATE LIST VIEW ******");
	UiUtil.populateListViewFromCollection(Alloy.Collections.Timeline, {

		datasetCb : function(el) {

			var attrs = el.toJSON();

			var diffTime = moment().diff(attrs.referenceTime, 'days');

			//attrs.catImage = ((_.isNull(attrs.category)) || (_.isNull(attrs.category.code)) ) ? '/images/android-robot.jpg' : '/images/cat_' + attrs.category.code.slice(0, 2) + ".png";
			var categoryLayout = extractCtegoryIcons(attrs.category.code.slice(0, 2));
			attrs.catImage = categoryLayout.icona;
			attrs.cat_color = categoryLayout.colore;

			//Ti.API.debug("CAT IMAGE: " + categoryLayout.colore);
			//attrs.postDate = (diffTime > 1) ? moment(attrs.referenceTime).format('LL') : moment(attrs.referenceTime).fromNow();
			attrs.postDate = moment(attrs.referenceTime).format('LL') + " - " + moment(attrs.referenceTime).format("HH:mm");
			attrs.cat_mini_icon = icons.tags;
			attrs.categoria = (!_.isNull(attrs.category)) ? attrs.category.name : "";

			attrs.rating_1 = (attrs.rating > 0) ? "/images/star-small.png" : "";
			attrs.rating_2 = (attrs.rating > 1) ? "/images/star-small.png" : "";
			attrs.rating_3 = (attrs.rating > 2) ? "/images/star-small.png" : "";
			attrs.rating_4 = (attrs.rating > 3) ? "/images/star-small.png" : "";
			attrs.rating_5 = (attrs.rating > 4) ? "/images/star-small.png" : "";

			attrs.tag = (_.isNull(attrs.tags)) ? "" : attrs.tags[0].name;

			//Ti.API.info("ELEMENT NAME: " + JSON.stringify(el));
			return ( {
				titolo : {
					text : el.get('name')
				},
				catColor : {
					backgroundColor : attrs.cat_color
				},
				cat_icon : {
					text : attrs.catImage
				},
				cat_mini_icon : {
					text : attrs.cat_mini_icon
				},
				categoria : {
					text : attrs.categoria
				},
				data : {
					text : attrs.postDate
				}
				//cat_icon:text="{catImage}" catColor:backgroundColor="{cat_color}" titolo:text="{name}" cat_mini_icon:text="{cat_mini_icon}" categoria:text="{categoria}" data:text="{postDate}
			});
		}
	}, $.timelineList);

	$.timelineList.setMarker({
		sectionIndex : 0,
		itemIndex : (Alloy.Collections.Timeline.length - 1)
	});

};

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

/*
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
 */

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

/*
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
 */

function dettaglioPost(e) {

	Alloy.Models.Post.set(Alloy.Collections.Timeline.at(e.itemIndex));
	//Ti.API.info("STATO POST: " + JSON.stringify(Alloy.Models.Post));

	var dett_post_win = Alloy.createController("dettaglio_post", {
		postIndex : e.itemIndex
	}).getView();
	Alloy.Globals.navMenu.openWindow(dett_post_win);

};

$.timeline_win.open();

$.timeline_win.addEventListener("close", function() {

	$.destroy();
});
