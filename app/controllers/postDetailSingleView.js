var args = arguments[0] || {};

//var dispatcher = require('dispatcher');

function resetIconColors() {
	$.event_icon.color = "#999";
	$.cashflow_icon.color = "#999";
	$.document_icon.color = "#999";
	$.note_icon.color = "#999";
	$.link_icon.color = "#999";

}

//Ti.API.info("**** ARGS *******: "+JSON.stringify(args));

var post = args.p_post;

$.cat_icon_container.backgroundColor = post.cat_color;
$.catIcon.text = post.catImage;
$.titolo.text = post.name;
$.cat_mini_icon.text = post.catMiniIcon;
$.category.text = post.categoria;
$.data_post.text = post.postDate;

