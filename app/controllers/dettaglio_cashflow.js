var args = arguments[0] || {};

var attrs = args.p_aspetto;

//Ti.API.info("MODELLO STRINGIFYZZATO CASHFLOW: " + JSON.stringify(attrs));

attrs.aspect_icon = icons.credit_card;
attrs.tipo_mov_desc = testExistence(attrs.data.tipoMovimento) ? attrs.data.tipoMovimento.descrizioneBreve : "";

attrs.tipo_mov_desc_estesa = testExistence(attrs.data.tipoMovimento) ? attrs.data.tipoMovimento.descrizioneBreve + " di" : "";

if (attrs.data.tipoMovimento.descrizioneBreve == "Uscita") {
	attrs.tipo_mov_color = "#E85D5F";
} else if (attrs.data.tipoMovimento.descrizioneBreve == "Entrata") {
	attrs.tipo_mov_color = "#7BC46E";
} else if (attrs.data.tipoMovimento.descrizioneBreve == "Bancomat") {
	attrs.tipo_mov_color = "#3B6BDB";
}

attrs.titolo_aspetto = attrs.data.descrizioneBreve;
attrs.desc_movimento = "  €" + parseFloat(attrs.data.importo).toFixed(2)+"  ";
attrs.data_operazione = "Eseguita " + moment(attrs.data.dataOperazione).format("LL") + " alle ore " + moment(attrs.data.dataOperazione).format("HH:mm");
attrs.fonte_liquidita = testExistence(attrs.data.fonteLiquidita) ? "Fonte Liquidità: " + attrs.data.fonteLiquidita.descrizioneBreve : "";


attrs.modalita_pagamento = testExistence(attrs.data.modalitaPagamento) ? "Modalità Pagamento: " + attrs.data.modalitaPagamento.descrizioneBreve : "";
attrs.stato_movimento = testExistence(attrs.data.statoMovimento) ? "Stato: " + attrs.data.statoMovimento.descrizioneBreve : "";
attrs.variabilita = testExistence(attrs.data.tipoVariabilita) ? "Variabilità: " + attrs.data.tipoVariabilita.descrizioneBreve : "";
attrs.dich_redditi = attrs.data.flagDichiarazioneRedditi? "Dichiarazione dei redditi: Non Rilevante": "Dichiarazione dei redditi: Rilevante";
attrs.ord_straord = attrs.data.flagOrdinarioStraordinario? attrs.data.tipoMovimento.descrizioneBreve+": Straordinaria": attrs.data.tipoMovimento.descrizioneBreve+": Ordinaria";
attrs.data_valuta = "Valuta: "+moment(attrs.data.dataValuta).format("LL") + " alle ore " + moment(attrs.data.dataValuta).format("HH:mm");
attrs.data_scadenza = "Scadenza: "+moment(attrs.data.dataScadenza).format("LL") + " alle ore " + moment(attrs.data.dataScadenza).format("HH:mm");
attrs.data_pagamento = "Pagamento: "+moment(attrs.data.dataPagamentoIncasso).format("LL") + " alle ore " + moment(attrs.data.dataPagamentoIncasso).format("HH:mm");
// ALTRO


//$.img_icon.text = attrs.aspect_icon;
$.tipo_mov.text = attrs.tipo_mov_desc;
$.tipo_mov.color = attrs.tipo_mov_color;
$.titolo.text = attrs.titolo_aspetto;
$.tipo_mov_ext.text = attrs.tipo_mov_desc_estesa;
$.desc_movimento.text = attrs.desc_movimento;
$.desc_movimento.backgroundColor = attrs.tipo_mov_color;
$.data_operazione.text = attrs.data_operazione;
$.fonte_liquidita.text = attrs.fonte_liquidita;
$.modalita_pagamento.text = attrs.modalita_pagamento;
$.stato_movimento.text = attrs.stato_movimento;
$.variabilita.text = attrs.variabilita;
$.dich_redditi.text = attrs.dich_redditi;
$.ord_straord.text = attrs.ord_straord;
$.data_valuta.text = attrs.data_valuta;
$.data_scadenza.text = attrs.data_scadenza;
$.data_pagamento.text = attrs.data_pagamento;



function testExistence(param) {

	return !(_.isUndefined(param) || _.isNull(param));

};