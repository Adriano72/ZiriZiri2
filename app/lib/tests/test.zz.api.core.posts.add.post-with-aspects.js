exports.test = function(options) {
	
	var _corePostsAddCallback = function(post){
		Ti.API.info("ZZ.API.Core.Posts.add success [response : " + JSON.stringify(post) + "]");
		
		var documentAspect = _.find(post.modules, function(module) {
			return module.kind.code == "FILEDOCUMENTDATATYPE_CODE";
		});			
		Ti.API.info("ZZ.API.Core.Posts.add success [aspect : " + JSON.stringify(documentAspect) + "]");
		
		documentAspect.id = null;
		documentAspect.name = "An Aspect From Titanium Starting From The Default Template " + documentAspect.kind.code;
		documentAspect.referenceTime = new Date().getTime();
		
		var _corePostAspectsAddCallback = function(addedAspect){
			Ti.API.info("ZZ.API.Core.Post.Aspects.add success [response : " + JSON.stringify(addedAspect) + "]");
				
			var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "data/files/IMAGE0000.jpg");
			var blob = file.read();				
	
			ZZ.API.Files.Attachment.set(addedAspect, blob, 
				function(response){
					Ti.API.info("ZZ.API.Files.Attachment.set success [response : " + response + "]");
					
					var cashflowAspect = _.find(post.modules, function(module) {
						return module.kind.code == "CASHFLOWDATATYPE_CODE";
					});			
					Ti.API.info("ZZ.API.Core.Post.Aspects.add success [aspect : " + JSON.stringify(cashflowAspect) + "]");
					
					cashflowAspect.id = null;
					cashflowAspect.name = "An Aspect From Titanium Starting From The Default Template " + cashflowAspect.kind.code;
					cashflowAspect.referenceTime = new Date().getTime();					
					
					ZZ.API.Core.Post.Aspects.add(cashflowAspect, null, function(response){
						Ti.API.info("ZZ.API.Core.Post.Aspects.add success [response : " + JSON.stringify(response) + "]");
						
						var linkAspect = _.find(post.modules, function(module) {
							return module.kind.code == "FILELINKDATATYPE_CODE";
						});			
						Ti.API.info("ZZ.API.Core.Post.Aspects.add success [aspect : " + JSON.stringify(linkAspect) + "]");
						
						linkAspect.id = null;
						linkAspect.name = "An Aspect From Titanium Starting From The Default Template " + linkAspect.kind.code;
						linkAspect.referenceTime = new Date().getTime();						
						
						ZZ.API.Core.Post.Aspects.add(linkAspect, null, function(response){
							Ti.API.info("ZZ.API.Core.Post.Aspects.add success [response : " + JSON.stringify(response) + "]");
							
							ZZ.API.Core.Post.commit(post, function(response){
								Ti.API.info("ZZ.API.Core.Post.commit success [response : " + JSON.stringify(response) + "]");
							}, function(error){
								Ti.API.error("ZZ.API.Core.Post.commit error [error : " + error + "]");
							});							
							
						}, function(error){
							Ti.API.error("ZZ.API.Core.Post.Aspects.add error [error : " + error + "]");
						});						
						
					}, function(error){
						Ti.API.error("ZZ.API.Core.Post.Aspects.add error [error : " + error + "]");
					});														
											
				}, function(error){
					Ti.API.error("ZZ.API.Files.Attachment.set error [error : " + error + "]");
				}
			);					
			
		};		
		
		ZZ.API.Core.Post.Aspects.add(documentAspect, null, _corePostAspectsAddCallback, function(error){
			Ti.API.error("ZZ.API.Core.Post.Aspects.add error [error : " + error + "]");
		});

	};

	var _coreSessionLogInCallback = function(response){
		Ti.API.info("ZZ.API.Core.Session.logIn success [user : " + JSON.stringify(response) + "]");
		
		ZZ.API.Core.Post.Templates.list(function(templates){
			Ti.API.info("ZZ.API.Core.Post.Templates.list success [response : " + JSON.stringify(templates) + "]");
									
			var template = templates.pop();
			Ti.API.info("ZZ.API.Core.Post.Templates.list success [template : " + JSON.stringify(template) + "]");
			
			template.id = null;
			template.name = "A Post From Titanium Starting From The Default Template";
			template.referenceTime = new Date().getTime();
			
			ZZ.API.Core.Posts.add(template, _corePostsAddCallback, function(error){
				Ti.API.error("ZZ.API.Core.Posts.add error [error : " + error + "]");
			});			
			
		}, function(error){
			Ti.API.error("ZZ.API.Core.Post.Templates.list error [error : " + error + "]");
		});
	};
	
	ZZ.API.Core.Session.logIn({
		username : "rnduser_1414682922894", //"rnduser_1414159788329", //"dummyuser",
		password : "password"
	}, _coreSessionLogInCallback, function(error){
		Ti.API.error("ZZ.API.Core.Session.logIn error [error : " + error + "]");
	});

};