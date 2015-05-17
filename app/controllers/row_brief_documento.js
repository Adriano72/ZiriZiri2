
var args = arguments[0] || {};

//Ti.API.info("DOCUMENT DATA *******: "+JSON.stringify(args));

var documento = args.p_aspetto;

ZZ.API.Files.Attachment.get(documento, function(response) {
	Ti.API.info("ZZ.API.Files.Attachment.get success");
	$.preview.image = response;

}, function(error) {
	Ti.API.error("ZZ.API.Files.Attachment.get error [error : " + error + "]");
});

//$.iconcina.text = icons.paper_clip;
$.titolo_doc.text = documento.data.title;
//$.document_date.text = moment(evento.data.startTime.time).format("LL") + " alle ore " + moment(evento.data.startTime.time).format("HH:mm");

if (!_.isNull(documento.data.creationTime)) {

	$.document_date.text = moment(documento.referenceTime).format("LL") + " alle ore " + moment(documento.referenceTime).format("HH:mm");

} else {
	$.document_date.height = 0;
}
