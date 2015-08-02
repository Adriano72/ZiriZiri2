exports.test = function(options) {

	var _coreSessionLogInCallback = function(response){
		Ti.API.info("ZZ.API.Core.Session.logIn success [user : " + JSON.stringify(response) + "]");
		
		ZZ.API.Finance.PaymentModes.list(function(paymentmodes){
			Ti.API.info("ZZ.API.Finance.PaymentModes.list success [response : " + JSON.stringify(paymentmodes) + "]");
		}, function(error){
			Ti.API.error("ZZ.API.Finance.PaymentModes.list error [error : " + error + "]");
		});
	};
	
	ZZ.API.Core.Session.logIn({
		username : "rnduser_1414682922894", //"rnduser_1414159788329", //"dummyuser",
		password : "password"
	}, _coreSessionLogInCallback, function(error){
		Ti.API.error("ZZ.API.Core.Session.logIn error [error : " + error + "]");
	});

};