var args = arguments[0] || {};

Ti.API.info("CASHFLOW COLLECTION: "+Alloy.Collections.aspettiCashflow.length);

//var ImageFactory = require('ti.imagefactory');

function transform(model) {
	
	var attrs = model.toJSON();
	
	Ti.API.info("MODELLO STRINGIFYZZAT DOCUMENT: "+JSON.stringify(attrs));
	
	//var selectedAspect = Alloy.Collections.aspettiDocument.at($.scrollableDocument.currentPage).attributes;
	var immagine;
	
	ZZ.API.Files.Attachment.get(attrs, function(response) {
		Ti.API.info("ZZ.API.Files.Attachment.get success");
		//var newBlob = ImageFactory.compress(response, 0.10);
		
		immagine = response;
		

	}, function(error) {
		Ti.API.error("ZZ.API.Files.Attachment.get error [error : " + error + "]");
	});
	
	attrs.img_preview = immagine;

	attrs.titolo = attrs.data.title;
	attrs.nome_file = attrs.data.name;
	attrs.tipologia = attrs.data.format.type;
	attrs.formato = attrs.data.format.name;
	var megaBytes = (attrs.data.size) / 1048576;
	var megaBytesRounded = parseFloat(Math.round(megaBytes * 100) / 100).toFixed(2);
	attrs.file_size = megaBytesRounded + "MB";
	attrs.tipologia = (attrs.data.flagOrdinarioStraordinario) ? "Straordinario" : "Ordinario";
	attrs.data_doc = moment(attrs.data.creationTime).format("LL");
	
	return attrs;

}


dataResync();

function testExistence(param){
	
	return !(_.isUndefined(param) || _.isNull(param));
	
};
