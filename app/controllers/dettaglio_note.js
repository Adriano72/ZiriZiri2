var args = arguments[0] || {};

//Ti.API.info("CASHFLOW COLLECTION: "+JSON.stringify(Alloy.Collections.aspettiCashflow));

Ti.API.info("LENGTH COLLECTION NOTE: "+Alloy.Collections.aspettiNote.length);

function transform(model) {
	
	var attrs = model.toJSON();
	
	Ti.API.info("MODELLO STRINGIFYZZATO NOTE: "+JSON.stringify(attrs));
	
	attrs.aspect_icon = icons.edit;
	attrs.titolo = attrs.data.title;
	attrs.note_content = attrs.data.content;
	
	

	//attrs.data_operazione = "Eseguita "+moment(attrs.data.dataOperazione).format("LL") + " alle ore "+moment(attrs.data.dataOperazione).format("h:mm a");
	
	return attrs;

}

dataResync();


function testExistence(param){
	
	return !(_.isUndefined(param) || _.isNull(param));
	
};