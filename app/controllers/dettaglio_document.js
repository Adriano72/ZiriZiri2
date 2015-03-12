var args = arguments[0] || {};

Ti.API.info("DOCUMENT COLLECTION LENGTH d: "+Alloy.Collections.aspettiCashflow.length);

//var ImageFactory = require('ti.imagefactory');

function transform(model) {
	
	var attrs = model.toJSON();
	
	Ti.API.info("MODELLO STRINGIFYZZATO DOCUMENT: "+JSON.stringify(attrs));
	/*
	ZZ.API.Files.Attachment.get(attrs, function(response) {
		Ti.API.info("ZZ.API.Files.Attachment.get success");
		
		attrs.img_preview = response;
		
	}, function(error) {
		Ti.API.error("ZZ.API.Files.Attachment.get error [error : " + error + "]");
	});
	*/
	
	
	attrs.aspect_icon = icons.paper_clip;
	attrs.titolo = attrs.data.title;
	attrs.nome_file = attrs.data.name;
	attrs.img_icon = icons.picture;
	
	var megaBytes = (attrs.data.size) / 1048576;
	var megaBytesRounded = parseFloat(Math.round(megaBytes * 100) / 100).toFixed(2);
	attrs.file_size = megaBytesRounded + "MB";
	attrs.tipologia = (attrs.data.flagOrdinarioStraordinario) ? "Straordinario" : "Ordinario";
	attrs.data_doc = "Data " + moment(attrs.data.creationTime).format("LL") + " alle ore "+moment(attrs.data.creationTime).format("h:mm a");
	
	return attrs;

}


dataResync();

function testExistence(param){
	
	return !(_.isUndefined(param) || _.isNull(param));
	
};
