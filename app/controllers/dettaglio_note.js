var args = arguments[0] || {};

var attrs = args.p_aspetto;

attrs.aspect_icon = icons.edit;
attrs.titolo = attrs.data.title;

try {
	attrs.note_content = Ti.Utils.base64decode(attrs.data.content);
} catch(e) {
	Ti.API.info("ERRORE: " + e);
	attrs.note_content = attrs.data.content;
}

//attrs.data_operazione = "Eseguita "+moment(attrs.data.dataOperazione).format("LL") + " alle ore "+moment(attrs.data.dataOperazione).format("h:mm a");

//$.img_icon.text = attrs.aspect_icon;
$.titolo.text = attrs.titolo;
$.note_content.text = attrs.note_content;

function testExistence(param) {

	return !(_.isUndefined(param) || _.isNull(param));

};