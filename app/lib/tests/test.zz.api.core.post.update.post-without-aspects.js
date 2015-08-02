exports.test = function(options) {

	var _corePostCommitCallback = function(response){
		Ti.API.info("ZZ.API.Core.Post.commit success [response : " + JSON.stringify(response) + "]");
	};

	var _corePostUpdateCallback = function(response){
		Ti.API.info("ZZ.API.Core.Post.update success [response : " + JSON.stringify(response) + "]");
		
		ZZ.API.Core.Post.commit(response, _corePostCommitCallback, function(error){
			Ti.API.error("ZZ.API.Core.Post.commit error [error : " + error + "]");
		});		
	};

	var _coreSessionLogInCallback = function(response){
		Ti.API.info("ZZ.API.Core.Session.logIn success [user : " + JSON.stringify(response) + "]");
		
		ZZ.API.Core.Posts.list(function(posts){
			Ti.API.info("ZZ.API.Core.Posts.list success [response : " + JSON.stringify(posts.length) + "]");
			
			/*
			_.each(posts, function(post) {
				Ti.API.info("ZZ.API.Core.Posts.list success [post.id : " + post.id + "]");
			});
			*/
					
			var post = posts[0];
			
			post.name = "UPDATED - " + post.name;
			
			ZZ.API.Core.Post.update(post, _corePostUpdateCallback, function(error){
				Ti.API.error("ZZ.API.Core.Post.get error [error : " + error + "]");
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