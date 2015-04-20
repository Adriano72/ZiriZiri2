var args = arguments[0] || {};

var attrs = args.p_aspetto;

//Ti.API.info("MODELLO STRINGIFYZZATO NOTE: " + JSON.stringify(attrs));

attrs.aspect_icon = icons.edit;
attrs.titolo = attrs.data.title;
attrs.data_nota = "Data " + moment(attrs.data.timestamp).format("LL") + " alle ore " + moment(attrs.data.timestamp).format("HH:mm");

try {
	attrs.note_content = Ti.Utils.base64decode(attrs.data.content);
} catch(e) {
	Ti.API.info("ERRORE: " + e);
	attrs.note_content = attrs.data.content;
}

//attrs.data_operazione = "Eseguita "+moment(attrs.data.dataOperazione).format("LL") + " alle ore "+moment(attrs.data.dataOperazione).format("h:mm a");

//$.img_icon.text = attrs.aspect_icon;
$.titolo.text = attrs.titolo;
$.data_nota.text = attrs.data_nota;
$.note_content.text = attrs.note_content+"                                                                                    .";

function testExistence(param) {

	return !(_.isUndefined(param) || _.isNull(param));

};