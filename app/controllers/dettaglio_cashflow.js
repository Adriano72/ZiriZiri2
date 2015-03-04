var args = arguments[0] || {};

//Ti.API.info("CASHFLOW COLLECTION: "+JSON.stringify(Alloy.Collections.aspettiCashflow));

Ti.API.info("LENGTH COLLECTION CASHFLOW: "+Alloy.Collections.aspettiCashflow.length);

function transformCASH(model) {
	
	var attrs = model.toJSON();
	
	Ti.API.info("MODELLO STRINGIFYZZATO CASHFLOW: ");//+JSON.stringify(attrs));

	attrs.importo = attrs.data.importo+"€";
	attrs.movimento = testExistence(attrs.data.tipoMovimento)?attrs.data.tipoMovimento.descrizioneBreve: "N.D.";
	attrs.pagamento = testExistence(attrs.data.pagamentoIncasso)?attrs.data.pagamentoIncasso.descrizioneBreve: "N.D.";
	attrs.variabilita = testExistence(attrs.data.tipoVariabilita)?attrs.data.tipoVariabilita.descrizioneBreve: "N.D.";
	attrs.stato = testExistence(attrs.data.statoMovimento)?attrs.data.statoMovimento.descrizioneBreve: "N.D.";
	attrs.tipologia = (attrs.data.flagOrdinarioStraordinario) ? "Straordinario" : "Ordinario";
	attrs.dich_redditi = (attrs.data.flagDichiarazioneRedditi) ? "Si" : "No";
	attrs.datavaluta = moment(attrs.data.dataValuta).format("LL");
	attrs.datascadenza = moment(attrs.data.dataScadenza).format("LL");
	attrs.datapagamento = moment(attrs.data.dataPagamentoIncasso).format("LL");
	
	return attrs;

}

dataResync();


function testExistence(param){
	
	return !(_.isUndefined(param) || _.isNull(param));
	
};