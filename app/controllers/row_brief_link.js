var args = arguments[0] || {};

//Ti.API.info("DOCUMENT DATA *******: "+JSON.stringify(args));



var link = args.p_aspetto;

$.iconcina.text = icons.link;
$.link_url.text = link.data.content.remote;
