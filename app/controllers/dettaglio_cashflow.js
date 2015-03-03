var args = arguments[0] || {};

Ti.API.info("CASHFLOW COLLECTION: "+JSON.stringify(Alloy.Collections.aspettiCashflow));

function transformData(model) {
	
	var attrs = model.toJSON();
	
	Ti.API.info("MODELLO STRINGIFYZZATO: "+JSON.stringify(attrs));

	attrs.importo = attrs.data.importo+"€";
	attrs.movimento = attrs.data.tipoMovimento.descrizioneBreve;
	
	return attrs;

}

dataResync();
