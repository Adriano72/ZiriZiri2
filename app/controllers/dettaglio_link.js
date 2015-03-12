var args = arguments[0] || {};

//Ti.API.info("CASHFLOW COLLECTION: "+JSON.stringify(Alloy.Collections.aspettiCashflow));

Ti.API.info("LENGTH COLLECTION LINK: " + Alloy.Collections.aspettiLink.length);

var goUrl;

function transform(model) {

	var attrs = model.toJSON();

	Ti.API.info("MODELLO STRINGIFYZZATO LINK: " + JSON.stringify(attrs));
	
	
		
		attrs.img_preview = attrs.data.preview.remote;
		
	

	attrs.aspect_icon = icons.link;
	attrs.titolo = attrs.data.title;
	attrs.link_url = attrs.data.content.local;
	
	goUrl = function() {
		Ti.Platform.openURL(attrs.data.content.local);
	};
	attrs.data_link = "Data "+moment(attrs.data.creationTime).format("LL") + " alle ore "+moment(attrs.data.creationTime).format("HH:mm");

	return attrs;

}


dataResync();

function testExistence(param) {

	return !(_.isUndefined(param) || _.isNull(param));

};