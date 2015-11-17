var args = arguments[0] || {};

var object = args.p_post;

var tools = require('utility');
var colors = require("colors");
var categories = require("categories");

function color(code) {
	return colors.colorMap["mdc-" + categories.colorMap[code] + "-300"];
};

var categoryRootCode = (object.category ? object.category.code.substring(0, 2) : null);

var categoryLayout;

if ((_.isNull(object.category)) || (_.isNull(object.category.code))) {
	categoryLayout = tools.extractCategoryIcons(null);
} else {
	categoryLayout = tools.extractCategoryIcons(object.category.code.slice(0, 2));
};

var catImage = categoryLayout.icona;
var cat_color = categoryLayout.colore;

//var dispatcher = require('dispatcher');

function resetIconColors() {
	$.event_icon.color = "#999";
	$.cashflow_icon.color = "#999";
	$.document_icon.color = "#999";
	$.note_icon.color = "#999";
	$.link_icon.color = "#999";

}

//Ti.API.info("**** ARGS *******: "+JSON.stringify(args));

$.headerRow.backgroundColor = color(categoryRootCode);
$.avatarBox.backgroundColor = color(categoryRootCode);
$.avatarImage.text = catImage;
$.firstLineTitle.text = object.name;
$.secondLineText.text = (!_.isNull(object.category)) ? object.category.name : "";
$.dateTimeRow.backgroundColor = color(categoryRootCode);
$.dateText.text = moment(new Date(object.referenceTime)).format("DD MMMM YYYY");
$.timeText.text = moment(new Date(object.referenceTime)).format("hh:mm a");
$.location.backgroundColor = color(categoryRootCode);
$.locationText.text = (object.location ? object.location.name : "");
$.marginator.backgroundColor = color(categoryRootCode);




