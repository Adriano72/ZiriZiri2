var rememberMe = false;

if (OS_ANDROID) {
	//zapImageCache();
	//var abx = require('com.alcoapps.actionbarextras');
}

var loadTabData = require("loadTabulatedData");

$.ricordami.getView().addEventListener('change', function(e) {
	rememberMe = e.value;
});

function doOpen(evt) {
	//Alloy.Globals.loading.show('Sincronizzazione', false);

	if (OS_ANDROID) {
		$.index.activity.actionBar.hide();

	}

}

if (Ti.App.Properties.getBool('authenticated', false)) {

	//Alloy.Globals.loading.show('Logging in...', false);

	ZZ.API.Core.Session.logIn({

		username : Ti.App.Properties.getString("user_username"),

		password : Ti.App.Properties.getString("user_password")

	}, _loadTimelineAlreadyLoggedIn, function(error) {

		alert("Username o password errati");

		Ti.API.error("ZZ.API.Core.Session.logIn error [error : " + error + "]");

	});

}

function _loadTimelineAlreadyLoggedIn(utente) {

	Ti.API.info("**** WELCOME BACK: " + utente.username);

	Alloy.Globals.loading.show('Sincronizzazione', false);

	loadTabData.loadTabData();

	ZZ.API.Core.Posts.list(function(posts) {
		Ti.API.info("ZZ.API.Core.Posts.list success [response : " + JSON.stringify(posts) + "]");

		loadTimeline(posts);
		//Ti.API.info("TIMELINE : " + JSON.stringify(Alloy.Collections.Timeline));

	}, function(error) {
		Ti.API.error("ZZ.API.Core.Posts.list error [error : " + error + "]");
		Alloy.Globals.loading.hide();
	});

}

var _coreSessionLogInCallback = function(user) {

	Alloy.Globals.loading.show('Sincronizzazione', false);

	Ti.API.info("ZZ.API.Core.Session.logIn success [user : " + JSON.stringify(user) + "]");

	loadTabData.loadTabData();

	if (rememberMe) {

		Ti.App.Properties.setBool('authenticated', true);
		Ti.App.Properties.setString("user_username", $.username.value);
		Ti.App.Properties.setString("user_password", $.password.value);

	};

	ZZ.API.Core.Posts.list(function(posts) {
		Ti.API.info("ZZ.API.Core.Posts.list success [response : " + JSON.stringify(posts) + "]");

		loadTimeline(posts);
		//Ti.API.info("TIMELINE : " + JSON.stringify(Alloy.Collections.Timeline));

	}, function(error) {
		Ti.API.error("ZZ.API.Core.Posts.list error [error : " + error + "]");
		Alloy.Globals.loading.hide();
	});

	//Alloy.Globals.navMenu.openWindow(timeline_win);

};

function loadTimeline(p_posts) {

	//Ti.API.info("POSTS ***** : " + JSON.stringify(p_posts));
	Alloy.Collections.Timeline.reset(p_posts);
	Alloy.Collections.Timeline.on("sync", showTimeline());

}

function showTimeline() {

	Ti.API.info("TIMELINE LENGTH : " + Alloy.Collections.Timeline.length);
	var timeline_win = Alloy.createController("timeline").getView().open();
}

function do_login(e) {

	var user_name = $.username.value || 'none';

	var user_password = $.password.value || 'none';

	//Alloy.Globals.loading.show('Logging in...', false);

	ZZ.API.Core.Session.logIn({

		username : $.username.value, //"rnduser_1418138154947", //"dummyuser",

		password : $.password.value //"password",

	}, _coreSessionLogInCallback, function(error) {

		alert("Username o password errati");

		Ti.API.error("ZZ.API.Core.Session.logIn error [error : " + error + "]");

	});

};

function manageRememberMe(e) {
	rememberMe = e.value;
}

$.index.open();
