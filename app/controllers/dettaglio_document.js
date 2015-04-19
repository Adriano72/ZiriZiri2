var args = arguments[0] || {};

var ImageFactory = require('ti.imagefactory');

var attrs = args.p_aspetto;

ZZ.API.Files.Attachment.get(attrs, function(response) {
	Ti.API.info("ZZ.API.Files.Attachment.get success");

	var newBlob = ImageFactory.compress(response, 0.20);
	attrs.img_preview = newBlob;

}, function(error) {
	Ti.API.error("ZZ.API.Files.Attachment.get error [error : " + error + "]");
});

attrs.aspect_icon = icons.paper_clip;
attrs.titolo = attrs.data.title;
attrs.nome_file = attrs.data.name;
attrs.img_icon = icons.picture;

var megaBytes = (attrs.data.size) / 1048576;
var megaBytesRounded = parseFloat(Math.round(megaBytes * 100) / 100).toFixed(2);
attrs.file_size = megaBytesRounded + "MB";
attrs.tipologia = (attrs.data.flagOrdinarioStraordinario) ? "Straordinario" : "Ordinario";
attrs.data_doc = "Data " + moment(attrs.data.creationTime).format("LL") + " alle ore " + moment(attrs.data.creationTime).format("h:mm a");

//$.img_icon.text = attrs.aspect_icon;
$.titolo.text = attrs.titolo;
$.img_iconcina.text = attrs.img_icon;
$.nome_file.text = attrs.nome_file;
$.filesize.text = attrs.file_size;
$.data_creazione = attrs.data_doc;
$.img_preview.image = attrs.img_preview;

function testExistence(param) {

	return !(_.isUndefined(param) || _.isNull(param));

};
