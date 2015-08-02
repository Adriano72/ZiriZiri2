exports.test = function(options) {

	var _coreSessionLogInCallback = function(response){
		Ti.API.info("ZZ.API.Core.Session.logIn success [user : " + JSON.stringify(response) + "]");
		
		ZZ.API.Finance.CashflowVariabilities.list(function(cashflowvariabilities){
			Ti.API.info("ZZ.API.Finance.CashflowVariabilities.list success [response : " + JSON.stringify(cashflowvariabilities) + "]");
		}, function(error){
			Ti.API.error("ZZ.API.Finance.CashflowVariabilities.list error [error : " + error + "]");
		});
	};
	
	ZZ.API.Core.Session.logIn({
		username : "rnduser_1414682922894", //"rnduser_1414159788329", //"dummyuser",
		password : "password"
	}, _coreSessionLogInCallback, function(error){
		Ti.API.error("ZZ.API.Core.Session.logIn error [error : " + error + "]");
	});

};