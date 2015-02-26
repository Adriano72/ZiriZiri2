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

$.ricordami.getView().addEventListener('change', function(e){
   alert(e); 
});

var _coreSessionLogInCallback = function(user) {

	Ti.API.info("ZZ.API.Core.Session.logIn success [user : " + JSON.stringify(user) + "]");

	if (rememberMe) {

		Ti.App.Properties.setBool('authenticated', true);
		Ti.App.Properties.setString("user_username", $.username.value);
		Ti.App.Properties.setString("user_password", $.password.value);

	};


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