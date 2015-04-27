var args = arguments[0] || {};

//var ImageFactory = require('ti.imagefactory');

var attrs = args.p_aspetto;

//Ti.API.info("MODELLO STRINGIFYZZATO DOCUMENT: " + JSON.stringify(attrs));

ZZ.API.Files.Attachment.get(attrs, function(response) {
	Ti.API.info("ZZ.API.Files.Attachment.get success");

	//var newBlob = ImageFactory.compress(response, 0.20);
	//attrs.img_preview = newBlob;
	$.img_preview.image = response;

}, function(error) {
	Ti.API.error("ZZ.API.Files.Attachment.get eerror [error : " + error + "]");
});

attrs.aspect_icon = icons.paper_clip;
attrs.titolo = attrs.data.title;
attrs.nome_file = attrs.data.name;
attrs.tipo_file = "Tipo File: "+attrs.data.format.name;
attrs.img_icon = icons.picture;

var megaBytes = (attrs.data.size) / 1048576;
var megaBytesRounded = parseFloat(megaBytes * 1000).toFixed(2);
attrs.file_size = "Dimensioni File: "+megaBytesRounded + "KB";
attrs.tipologia = (attrs.data.flagOrdinarioStraordinario) ? "Straordinario" : "Ordinario";
attrs.data_documento = "Data " + moment(attrs.data.creationTime).format("LL") + " alle ore " + moment(attrs.data.creationTime).format("HH:mm");

//$.img_icon.text = attrs.aspect_icon;
$.titolo.text = attrs.titolo;
$.img_iconcina.text = attrs.img_icon;
$.nome_file.text = attrs.nome_file;
$.filesize.text = attrs.file_size;
$.tipo_file.text = attrs.tipo_file;
$.data_documento.text = attrs.data_documento;


function testExistence(param) {

	return !(_.isUndefined(param) || _.isNull(param));

};
