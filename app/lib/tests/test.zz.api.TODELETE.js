var _coreSessionLogInCallback = function(user){
	Ti.API.info("ZZ.API.Core.Session.logIn success [user : " + JSON.stringify(user) + "]");
	
	ZZ.API.Core.Posts.add({
		
		name : "A Post From Titanium",
		referenceTime : new Date().getTime()
		
	}, _corePostsAddCallback, function(error){
		Ti.API.error("ZZ.API.Core.Posts.add error [error : " + error + "]");
	});	
	
	/*
	ZZ.API.Core.Posts.list(function(posts){
		Ti.API.info("ZZ.API.Core.Posts.list success [response : " + JSON.stringify(posts) + "]");
	}, function(error){
		Ti.API.error("ZZ.API.Core.Posts.list error [error : " + error + "]");
	});
	
	ZZ.API.Core.Post.Templates.list(function(templates){
		Ti.API.info("ZZ.API.Core.Post.Templates.list success [response : " + JSON.stringify(templates) + "]");
	}, function(error){
		Ti.API.error("ZZ.API.Core.Post.Templates.list error [error : " + error + "]");
	});	
	
	ZZ.API.Core.Categories.list(function(categories){
		Ti.API.info("ZZ.API.Core.Categories.list success [response : " + JSON.stringify(categories) + "]");
	}, function(error){
		Ti.API.error("ZZ.API.Core.Categories.list error [error : " + error + "]");
	});	
		
	ZZ.API.Core.Tags.list(function(tags){
		Ti.API.info("ZZ.API.Core.Tags.list success [response : " + JSON.stringify(tags) + "]");
	}, function(error){
		Ti.API.error("ZZ.API.Core.Tags.list error [error : " + error + "]");
	});
	
	ZZ.API.Core.Stories.list(function(stories){
		Ti.API.info("ZZ.API.Core.Stories.list success [response : " + JSON.stringify(stories) + "]");
	}, function(error){
		Ti.API.error("ZZ.API.Core.Stories.list error [error : " + error + "]");
	});
	
	ZZ.API.Finance.CashSources.list(function(cashsources){
		Ti.API.info("ZZ.API.Finance.CashSources.list success [response : " + JSON.stringify(cashsources) + "]");
	}, function(error){
		Ti.API.error("ZZ.API.Finance.CashSources.list error [error : " + error + "]");
	});

	ZZ.API.Finance.PaymentModes.list(function(paymentmodes){
		Ti.API.info("ZZ.API.Finance.PaymentModes.list success [response : " + JSON.stringify(paymentmodes) + "]");
	}, function(error){
		Ti.API.error("ZZ.API.Finance.PaymentModes.list error [error : " + error + "]");
	});
	
	ZZ.API.Finance.CashflowStatuses.list(function(cashflowstatuses){
		Ti.API.info("ZZ.API.Finance.CashflowStatuses.list success [response : " + JSON.stringify(cashflowstatuses) + "]");
	}, function(error){
		Ti.API.error("ZZ.API.Finance.CashflowStatuses.list error [error : " + error + "]");
	});
	
	ZZ.API.Finance.PaymentTakingTools.list(function(paymenttakingtools){
		Ti.API.info("ZZ.API.Finance.PaymentTakingTools.list success [response : " + JSON.stringify(paymenttakingtools) + "]");
	}, function(error){
		Ti.API.error("ZZ.API.Finance.PaymentTakingTools.list error [error : " + error + "]");
	});

	ZZ.API.Finance.CashflowTypes.list(function(cashflowtypes){
		Ti.API.info("ZZ.API.Finance.CashflowTypes.list success [response : " + JSON.stringify(cashflowtypes) + "]");
	}, function(error){
		Ti.API.error("ZZ.API.Finance.CashflowTypes.list error [error : " + error + "]");
	});
	
	ZZ.API.Finance.CashflowVariabilities.list(function(cashflowvariabilities){
		Ti.API.info("ZZ.API.Finance.CashflowVariabilities.list success [response : " + JSON.stringify(cashflowvariabilities) + "]");
	}, function(error){
		Ti.API.error("ZZ.API.Finance.CashflowVariabilities.list error [error : " + error + "]");
	});
	
	ZZ.API.Finance.CashflowCurrencies.list(function(cashflowcurrencies){
		Ti.API.info("ZZ.API.Finance.CashflowCurrencies.list success [response : " + JSON.stringify(cashflowcurrencies) + "]");
	}, function(error){
		Ti.API.error("ZZ.API.Finance.CashflowCurrencies.list error [error : " + error + "]");
	});	
	*/
};

var _corePostsAddCallback = function(post){
	Ti.API.info("ZZ.API.Core.Posts.add success [response : " + JSON.stringify(post) + "]");
			
	post.description = "An UPDATED Post From Titanium";
			
	ZZ.API.Core.Post.update(post, _corePostUpdateCallback, function(error){
		Ti.API.error("ZZ.API.Core.Post.update error [error : " + error + "]");
	});
};

var _corePostUpdateCallback = function(post){
	Ti.API.info("ZZ.API.Core.Post.update success [response : " + JSON.stringify(post) + "]");
			
	ZZ.API.Core.Post.get(post, _corePostGetCallback, function(error){
		Ti.API.error("ZZ.API.Core.Post.get error [error : " + error + "]");
	});
	
};

var _corePostGetCallback = function(post){
	Ti.API.info("ZZ.API.Core.Post.get success [response : " + JSON.stringify(post) + "]");
				
	ZZ.API.Core.Post.Aspects.add({

		name : "An Aspect From Titanium",
		referenceTime : new Date().getTime()
		
	}, null, _corePostAspectsAddCallback, function(error){
		Ti.API.error("ZZ.API.Core.Post.Aspects.add error [error : " + error + "]");
	});			
};

var _corePostAspectsAddCallback = function(aspect){
	Ti.API.info("ZZ.API.Core.Post.Aspects.add success [response : " + JSON.stringify(aspect) + "]");
			
	aspect.description = "An UPDATED Aspect From Titanium";
	
	ZZ.API.Core.Aspect.update(aspect, null, _coreAspectUpdateCallback, function(error){
		Ti.API.error("ZZ.API.Core.Aspect.update error [error : " + error + "]");
	});

};

var _coreAspectUpdateCallback = function(aspect){
	Ti.API.info("ZZ.API.Core.Aspect.update success [response : " + JSON.stringify(aspect) + "]");
							
	ZZ.API.Core.Aspect.get(aspect, _coreAspectGetCallback, function(error){
		Ti.API.error("ZZ.API.Core.Aspect.get error [error : " + error + "]");
	});		
};

var _coreAspectGetCallback = function(aspect){
	Ti.API.info("ZZ.API.Core.Aspect.get success [response : " + JSON.stringify(aspect) + "]");							
					
	/*
	ZZ.API.Files.Attachment.set(aspect, "Simple Text Content", 
	function(response){
		Ti.API.info("ZZ.API.Files.Attachment.set success [response : " + response + "]");
			
		ZZ.API.Files.Attachment.get(aspect, 
			function(response){
				Ti.API.info("ZZ.API.Files.Attachment.get success [response : " + JSON.stringify(response) + "]");
									
			}, function(error){
				Ti.API.error("ZZ.API.Files.Attachment.get error [error : " + error + "]");
			});						
	}, function(error){
			Ti.API.error("ZZ.API.Files.Attachment.set error [error : " + error + "]");
	});	
	*/
	
};

/*
ZZ.API.Core.Session.logIn({
	username : "rnduser_1414682922894", //"rnduser_1414159788329", //"dummyuser",
	password : "password"
}, _coreSessionLogInCallback, function(error){
	Ti.API.error("ZZ.API.Core.Session.logIn error [error : " + error + "]");
});
*/