exports.test = function(options) {

	var _coreSessionLogInCallback = function(response){
		Ti.API.info("ZZ.API.Core.Session.logIn success [user : " + JSON.stringify(response) + "]");
		
		ZZ.API.Core.Posts.list(function(posts){
			Ti.API.info("ZZ.API.Core.Posts.list success [response : " + JSON.stringify(posts) + "]");
			
			_.each(posts, function(post){
				Ti.API.info("ZZ.API.Core.Posts.list [post.id : " + post.id + "]");
			});
			
		}, function(error){
			Ti.API.error("ZZ.API.Core.Posts.list error [error : " + error + "]");
		});	
	};
	
	ZZ.API.Core.Session.logIn({
		username : "rnduser_1418138154947", //"rnduser_1414159788329", //"dummyuser",
		password : "password"
	}, _coreSessionLogInCallback, function(error){
		Ti.API.error("ZZ.API.Core.Session.logIn error [error : " + error + "]");
	});

};