var args = arguments[0] || {};

//Ti.API.info("DOCUMENT DATA *******: "+JSON.stringify(args));

var nota = args.p_aspetto;



//$.iconcina.text = icons.paper_clip;
$.titolo_nota.text = nota.data.title;
//$.document_date.text = moment(evento.data.startTime.time).format("LL") + " alle ore " + moment(evento.data.startTime.time).format("HH:mm");

try {
	$.mini_nota.text = Ti.Utils.base64decode(nota.data.content);
} catch(e) {
	Ti.API.info("ERRORE: " + e);
	$.mini_nota.text  = nota.data.content;
}
