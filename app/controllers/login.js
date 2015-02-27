var rememberMe = false;

if (OS_ANDROID) {
	//zapImageCache();
	var abx = require('com.alcoapps.actionbarextras');
}

function doOpen(evt) {
	//Alloy.Globals.loading.show('Sincronizzazione', false);
	Alloy.Globals.navMenu = $.navWin;
	if (OS_ANDROID) {
		abx.title = "ZiriZiri";
		abx.titleFont = "SourceSansPro-Regular.ttf";
		abx.titleColor = "#4A678C";

		//actionBarHelper.setIcon('/drawericonw@2x.png');

	} else {
		//$.windowtitle.text = winTitle;
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

	var loadTabData = require("loadTabulatedData");

	loadTabData.loadTabData();

	ZZ.API.Core.Posts.list(function(posts) {

		Ti.API.info("ZZ.API.Core.Posts.list success [response : " + JSON.stringify(posts) + "]");

		Ti.App.Properties.setObject('timelineProp', posts);

		//Alloy.Collections.Timeline.reset(posts);

		//Ti.API.info("PROP TIMELINE: " + JSON.stringify(Ti.App.Properties.getObject('timelineProp')));

		var timeline_win = Alloy.createController("timeline").getView();
		Alloy.Globals.navMenu.openWindow(timeline_win);

	}, function(error) {

		Ti.API.error("ZZ.API.Core.Posts.list error [error : " + error + "]");

	});

}


$.ricordami.getView().addEventListener('change', function(e) {
	rememberMe = e.value;
});

var _coreSessionLogInCallback = function(user) {

	Ti.API.info("ZZ.API.Core.Session.logIn success [user : " + JSON.stringify(user) + "]");

	if (rememberMe) {

		Ti.App.Properties.setBool('authenticated', true);
		Ti.App.Properties.setString("user_username", $.username.value);
		Ti.App.Properties.setString("user_password", $.password.value);

	};

	var timeline_win = Alloy.createController("timeline").getView();
	Alloy.Globals.navMenu.openWindow(timeline_win);

};

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

$.navWin.open();
