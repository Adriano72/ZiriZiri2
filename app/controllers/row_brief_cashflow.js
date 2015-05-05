var args = arguments[0] || {};

//Ti.API.info("EVENT DATA *******: "+JSON.stringify(args));

var cashflow = args.p_aspetto;

$.iconcina.text = icons.credit_card;
$.tipoMov.text = cashflow.data.tipoMovimento.descrizioneBreve;
$.importo.text = "€ " + cashflow.data.importo;


$.fonte_liquidita.text = testExistence(cashflow.data.fonteLiquidita)?"Tramite "+cashflow.data.fonteLiquidita.descrizioneBreve:"";

function testExistence(param) {

	return !(_.isUndefined(param) || _.isNull(param));

};
