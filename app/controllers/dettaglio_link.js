var args = arguments[0] || {};

var goUrl;

var attrs = args.p_aspetto;

//Ti.API.info("MODELLO STRINGIFYZZATO LINK: " + JSON.stringify(attrs));

attrs.img_preview = testExistence(attrs.data.preview)?attrs.data.preview.remote:null;

attrs.aspect_icon = icons.link;
attrs.titolo = attrs.data.title;
attrs.link_url = attrs.data.content.remote;

goUrl = function() {
	Ti.Platform.openURL(attrs.data.content.remote);
};
attrs.data_link = "Data " + moment(attrs.data.creationTime).format("LL") + " alle ore " + moment(attrs.data.creationTime).format("HH:mm");

//$.img_icon.text = attrs.aspect_icon;
$.titolo.text = attrs.titolo;
$.link_url.text = attrs.link_url;
$.data_link.text = attrs.data_link;
$.img_preview.image = attrs.img_preview;



function testExistence(param) {

	return !(_.isUndefined(param) || _.isNull(param));

};