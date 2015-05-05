var args = arguments[0] || {};

//Ti.API.info("EVENT DATA *******: "+JSON.stringify(args));

var evento = args.p_aspetto;

$.iconcina.text = icons.paper_clip;
$.location.text = evento.location?evento.location.name:"";
$.start_date.text = "Inizia " + moment(evento.data.startTime.time).format("LL") + " alle ore " + moment(evento.data.startTime.time).format("HH:mm");

if(!_.isNull(evento.data.endTime)){
	
	$.end_date.text = "Finisce " + moment(evento.data.endTime.time).format("LL") + " alle ore " + moment(evento.data.endTime.time).format("HH:mm");
	
}else{
	$.end_date.height = 0;
}


