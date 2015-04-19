var args = arguments[0] || {};

var attrs = args.p_aspetto;

attrs.aspect_icon = icons.credit_card;
attrs.tipo_mov_desc = testExistence(attrs.data.tipoMovimento) ? attrs.data.tipoMovimento.descrizioneBreve : "";

attrs.tipo_mov_desc_estesa = testExistence(attrs.data.tipoMovimento) ? attrs.data.tipoMovimento.descrizioneBreve + " di" : "";

if (attrs.data.tipoMovimento.descrizioneBreve == "Uscita") {
	attrs.tipo_mov_color = "#E85D5F";
} else if ((attrs.data.tipoMovimento.descrizioneBreve == "Entrata")) {
	attrs.tipo_mov_color = "#7BC46E";
} else if ((attrs.data.tipoMovimento.descrizioneBreve == "Bancomat")) {
	attrs.tipo_mov_color = "#3B6BDB";
}

attrs.titolo_aspetto = attrs.data.descrizioneBreve;
attrs.desc_movimento = "  " + attrs.data.importo + "€  ";
attrs.data_operazione = "Eseguita " + moment(attrs.data.dataOperazione).format("LL") + " alle ore " + moment(attrs.data.dataOperazione).format("HH:mm");
attrs.mod_pagamento = testExistence(attrs.data.modalitaPagamento) ? "Pagato tramite " + attrs.data.modalitaPagamento.descrizioneBreve : "";

//$.img_icon.text = attrs.aspect_icon;
$.tipo_mov.text = attrs.tipo_mov_desc;
$.tipo_mov.color = attrs.tipo_mov_color;
$.titolo.text = attrs.titolo_aspetto;
$.tipo_mov_ext.text = attrs.tipo_mov_desc_estesa;
$.desc_movimento.text = attrs.desc_movimento;
$.desc_movimento.backgroundColor = attrs.tipo_mov_color;
$.data_operazione.text = attrs.data_operazione;
$.mod_pagamento.text = attrs.mod_pagamento;



function testExistence(param) {

	return !(_.isUndefined(param) || _.isNull(param));

};