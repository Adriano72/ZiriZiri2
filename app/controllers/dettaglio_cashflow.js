var args = arguments[0] || {};

//Ti.API.info("CASHFLOW COLLECTION: "+JSON.stringify(Alloy.Collections.aspettiCashflow));

Ti.API.info("LENGTH COLLECTION CASHFLOW: "+Alloy.Collections.aspettiCashflow.length);

function transformCASH(model) {
	
	var attrs = model.toJSON();
	
	Ti.API.info("MODELLO STRINGIFYZZATO CASHFLOW: "+JSON.stringify(attrs));
	
	attrs.aspect_icon = icons.credit_card;
	attrs.tipo_mov_desc = testExistence(attrs.data.tipoMovimento)?attrs.data.tipoMovimento.descrizioneBreve:"";
	
	attrs.tipo_mov_desc_estesa = testExistence(attrs.data.tipoMovimento)?attrs.data.tipoMovimento.descrizioneBreve+" di":"";
	
	if(attrs.data.tipoMovimento.descrizioneBreve == "Uscita"){			
		attrs.tipo_mov_color = "#E85D5F";
	}else if((attrs.data.tipoMovimento.descrizioneBreve == "Entrata")){
		attrs.tipo_mov_color = "#7BC46E";
	}
	
	attrs.titolo_aspetto = attrs.data.descrizioneBreve;
	attrs.desc_movimento = "  "+attrs.data.importo+"  ";
	attrs.data_operazione = "Eseguita "+moment(attrs.data.dataOperazione).format("LL") + " alle ore "+moment(attrs.data.dataOperazione).format("h:mm a");
	attrs.mod_pagamento = testExistence(attrs.data.modalitaPagamento)?"Pagato tramite "+attrs.data.modalitaPagamento.descrizioneBreve:"";
	
	return attrs;

}

dataResync();


function testExistence(param){
	
	return !(_.isUndefined(param) || _.isNull(param));
	
};