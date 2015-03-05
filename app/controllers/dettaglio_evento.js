var args = arguments[0] || {};

Ti.API.info("EVENTO COLLECTION LENGTH: " + Alloy.Collections.aspettoEvento.length);

//var ImageFactory = require('ti.imagefactory');

Ti.API.info("ASPETTO EVENTO: " + JSON.stringify(Alloy.Collections.aspettoEvento));

var aspetto = Alloy.Collections.aspettoEvento.at(0);

var attrs = aspetto.toJSON();

Ti.API.info("MODELLO STRINGIFYZZAT EVENTO: " + JSON.stringify(attrs));

function testExistence(param) {

	return !(_.isUndefined(param) || _.isNull(param));

};
