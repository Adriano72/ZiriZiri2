var args = arguments[0] || {};

var tools = require('utility');
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
		var versione = null;
		var nuovo_post = null;

		activity.onCreateOptionsMenu = function(e) {

			/*
			 abx.setBackgroundColor("white");
			 activity.actionBar.displayHomeAsUp = true;
			 abx.setHomeAsUpIcon("/images/logo.png");
			 */
			/*
			take_picture = e.menu.add({
				//itemId : "PHOTO",
				title : "Fai Foto",
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
				icon : Ti.Android.R.drawable.ic_menu_camera
			});

			take_picture.addEventListener("click", function(e) {

				tools.openCamera(function(p_blob) {

					var nuovo_post_win = Alloy.createController("inserimento_post", {
						shortcut : true,
						media : p_blob,
						_callback : function() {
							//$.ptr.refresh();
							populateListView();
						}
					}).getView();

					Alloy.Globals.navMenu.openWindow(nuovo_post_win);

				});

			});

			nuovo_post = e.menu.add({
				//itemId : "PHOTO",
				title : "Nuovo Post",
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
				icon : Ti.Android.R.drawable.ic_menu_add
			});

			nuovo_post.addEventListener("click", function(e) {

				var nuovo_post_win = Alloy.createController("inserimento_post", {
					shortcut : false,
					media : null,
					_callback : function() {
						$.ptr.refresh();
					}
				}).getView();

				Alloy.Globals.navMenu.openWindow(nuovo_post_win);
			});
			*/
			settings = e.menu.add({
				//itemId : "PHOTO",
				title : "Logout",
				showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER
				//icon : Ti.Android.R.drawable.ic_menu_camera
			});

			settings.addEventListener("click", function(e) {
				f_logout();
			});

			versione = e.menu.add({
				//itemId : "PHOTO",
				title : "V 2.2.5",
				showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER
				//icon : Ti.Android.R.drawable.ic_menu_camera
			});

		};

		activity.invalidateOptionsMenu();

	}

	Alloy.Globals.loading.hide();

	populateListView();

}

function onAddFromImages() {
	tools.openCamera(function(p_blob) {

		var nuovo_post_win = Alloy.createController("inserimento_post", {
			shortcut : true,
			media : p_blob,
			_callback : function() {
				//$.ptr.refresh();
				populateListView();
			}
		}).getView();

		Alloy.Globals.navMenu.openWindow(nuovo_post_win);

	});
}

function onAddFromScratch() {
	var nuovo_post_win = Alloy.createController("inserimento_post", {
		shortcut : false,
		media : null,
		_callback : function() {
			$.ptr.refresh();
		}
	}).getView();

	Alloy.Globals.navMenu.openWindow(nuovo_post_win);
}

function addMorePosts() {
	Ti.API.info("MARKER RAGGIUNTO  !!!!!!!!!!!");
	$.ptr.show();
	ZZ.API.Core.Posts.list(function(posts) {
		//Ti.API.info("ZZ.API.Core.Posts.list success [response : " + JSON.stringify(posts) + "]");
		Ti.API.info("@@@@@@@@@@@@ TIMELINE LENGHT " + Alloy.Collections.Timeline.length);
		Ti.API.info("@@@@@@@@@@@@ MORE POST LENGHT " + posts.length);
		Alloy.Collections.Timeline.add(posts);
		Alloy.Collections.Timeline.on("sync", populateListView(posts.length));
		$.ptr.hide();
		//Ti.API.info("TIMELINE : " + JSON.stringify(Alloy.Collections.Timeline));

	}, function(error) {
		Ti.API.error("ZZ.API.Core.Posts.list error [error : " + error + "]");
		Alloy.Globals.loading.hide();
	}, {
		action : ZZ.API.Core.Posts.CONSTANTS.ACTIONS.LOAD_MORE
	});

}

function populateListView(numPosts) {

	Ti.API.info(" ******** POPULATE LIST VIEW ******");
	//Ti.API.info("ULTIO POST IN TIMELINE: " + JSON.stringify(Alloy.Collections.Timeline.at(0)));
	UiUtil.populateListViewFromCollection(Alloy.Collections.Timeline, {

		datasetCb : function(el) {

			var attrs = el.toJSON();

			var stories = null;
			if (attrs.stories) {
				stories = "";
				_.each(attrs.stories, function(item, index) {
					stories = stories.concat((index > 0 ? ", " : ""), item.name);
				});
			}

			var tags = null;
			if (attrs.tags) {
				tags = "";
				_.each(attrs.tags, function(item, index) {
					tags = tags.concat((index > 0 ? ", " : ""), item.name);
				});
			}

			var diffTime = moment().diff(attrs.referenceTime, 'days');

			//attrs.catImage = ((_.isNull(attrs.category)) || (_.isNull(attrs.category.code)) ) ? '/images/android-robot.jpg' : '/images/cat_' + attrs.category.code.slice(0, 2) + ".png";
			var categoryLayout;

			if ((_.isNull(attrs.category)) || (_.isNull(attrs.category.code))) {
				categoryLayout = tools.extractCategoryIcons(null);
			} else {
				categoryLayout = tools.extractCategoryIcons(attrs.category.code.slice(0, 2));
			};

			attrs.catImage = categoryLayout.icona;
			attrs.cat_color = categoryLayout.colore;

			//Ti.API.debug("CAT IMAGE: " + categoryLayout.colore);
			//attrs.postDate = (diffTime > 1) ? moment(attrs.referenceTime).format('LL') : moment(attrs.referenceTime).fromNow();
			//attrs.postDate = moment(attrs.referenceTime).format('LL') + " - " + moment(attrs.referenceTime).format("HH:mm");
			attrs.time = moment(new Date(attrs.referenceTime)).format("DD MMM"), attrs.cat_mini_icon = icons.tags;
			attrs.categoria = (!_.isNull(attrs.category)) ? attrs.category.name : "";

			attrs.rating_1 = (attrs.rating > 0) ? "/images/star-small.png" : "";
			attrs.rating_2 = (attrs.rating > 1) ? "/images/star-small.png" : "";
			attrs.rating_3 = (attrs.rating > 2) ? "/images/star-small.png" : "";
			attrs.rating_4 = (attrs.rating > 3) ? "/images/star-small.png" : "";
			attrs.rating_5 = (attrs.rating > 4) ? "/images/star-small.png" : "";

			attrs.tag = (_.isNull(attrs.tags)) ? "" : attrs.tags[0].name;

			//Ti.API.info("ELEMENT NAME: " + JSON.stringify(el));
			return ( {
				title : {
					text : el.get('name')
				},
				avatarBox : {
					backgroundColor : attrs.cat_color
				},
				avatarImage : {
					text : attrs.catImage
				},
				subtitle : {
					text : attrs.categoria
				},
				subsubtitle : {
					text : "".concat(( stories ? stories : ""), (stories && tags ? ", " : ""), ( tags ? tags : "")),
				},
				time : {
					text : attrs.time
				}
				//cat_icon:text="{catImage}" catColor:backgroundColor="{cat_color}" titolo:text="{name}" cat_mini_icon:text="{cat_mini_icon}" categoria:text="{categoria}" data:text="{postDate}
			});
		}
	}, $.listView);

	$.ptr.hide();
	//Alloy.Globals.loading.hide();
	if (numPosts > 0 || _.isUndefined(numPosts)) {
		$.listView.setMarker({
			sectionIndex : 0,
			itemIndex : (Alloy.Collections.Timeline.length - 1)
		});
	}

};

function reloadAllData() {

	//Alloy.Globals.loading.show("Sincronizzazione");
	Ti.API.info("RELOAD ALL DATA ******");

	ZZ.API.Core.Posts.list(function(posts) {

		Alloy.Collections.Timeline.reset(posts);
		//Alloy.Collections.Timeline.on("sync", showTimeline());
		populateListView();

	}, function(error) {
		Ti.API.error("ZZ.API.Core.Posts.list error [error : " + error + "]");
		Alloy.Globals.loading.hide();
	});

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
