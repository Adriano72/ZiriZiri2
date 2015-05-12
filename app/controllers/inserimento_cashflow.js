var args = arguments[0] || {};

//Ti.API.info("ARGS*******: " + moment(args.p_reference_time));

var cashSources = Alloy.Collections.CashSources;

var tipiMovimento = Ti.App.Properties.getObject("elencoTipoMov", null);

var tipoMovimento = _.find(tipiMovimento, function(value) {
	return value.descrizioneBreve == args.p_tipo;
});

//Ti.API.info("TIPO MOVIMENTO ****: " + JSON.stringify(tipoMovimento));

var selectedCashsource = null;
var selectedPaymentMode = null;
var selectedPaymentTakingTool = null;
var selectedStato = null;
var mov_da = null;
var mov_a = null;
var selectedTramite = null;
var selectedCon = null;
var selectedVariabilita = null;
var dichRedditi = 0;
var ordinario = 0;
var dataMovimento = +moment(args.p_reference_time);
var dataValuta = +moment(args.p_reference_time);
var dataScadenza = +moment(args.p_reference_time);
var dataPagInc = +moment(args.p_reference_time);

var jsonCashflowTemplate = Alloy.Models.Cashflow_template.toJSON();

function doOpen() {

	$.altro_container.visible = false;

	if (args.p_tipo == "Uscita") {

		$.testatina_movimento.color = "#E85D5F";
		$.payment_modes_label.text = "Pagamento";
		$.payment_taking_tool_label.text = "Pagato tramite";
		$.variabilita_container.height = 35;
		$.redditi_container.height = 35;
		$.ordinario_container.height = 35;
		$.data_pag_inc_container.height = 35;
		$.data_pag_inc_label.text = "Pagamento";

	} else if (args.p_tipo == "Entrata") {

		$.testatina_movimento.color = "#7BC46E";
		$.payment_modes_label.text = "Incasso";
		$.payment_taking_tool_label.text = "Incassato tramite";
		$.variabilita_container.height = 35;
		$.redditi_container.height = 35;
		$.ordinario_container.height = 35;
		$.data_pag_inc_container.height = 35;
		$.data_pag_inc_label.text = "Incasso";

	} else if (args.p_tipo == "Bancomat") {

		$.testatina_movimento.color = "#3B6BDB";
		$.payment_modes_label.text = "Prelievo";
		$.payment_taking_tool_label.text = "Prelievo tramite";
		$.payment_modes_container.height = 0;

	} else {
		$.testatina_movimento.color = "#6B6B6B";
		$.cashsources_container.height = 0;
		$.payment_modes_container.height = 0;
		$.payment_taking_tool_container.height = 0;
		$.stato_container.height = 0;
		$.mov_da_container.height = 35;
		$.tramite_con_container.height = 35;
		$.data_valuta_container.height = 0;
	}

	$.testatina_movimento.text = args.p_tipo;
	$.titolo_cashflow.value = args.p_titolo;
	$.importo_label.text = args.p_tipo + " di";
	$.data_movimento.text = moment(args.p_reference_time).format("LL") + " alle ore " + moment(args.p_reference_time).format("HH:mm");
	$.data_valuta.text = moment(args.p_reference_time).format("LL") + " alle ore " + moment(args.p_reference_time).format("HH:mm");
	$.data_scadenza.text = moment(args.p_reference_time).format("LL") + " alle ore " + moment(args.p_reference_time).format("HH:mm");
	$.data_pag_inc.text = moment(args.p_reference_time).format("LL") + " alle ore " + moment(args.p_reference_time).format("HH:mm");

	//$.start_date.text = "Inizia: " + moment().format("LL") + " alle ore " + moment().format("HH:mm");
	//$.end_date.text = "Finisce...";

	if (OS_ANDROID) {

		var activity = $.insermiento_cashflow.activity;
		var settings = null;
		var nuovo_post = null;
		/*
		 $.start_orologetto.text = icons.calendar_empty;
		 $.end_orologetto.text = icons.calendar_empty;
		 $.map_marker.text = icons.map_marker;
		 */
		activity.onCreateOptionsMenu = function(e) {

			salva_cashflow = e.menu.add({
				//itemId : "PHOTO",
				title : "Salva Evento",
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
				icon : Ti.Android.R.drawable.ic_menu_save
			});

			salva_cashflow.addEventListener("click", function(e) {
				Alloy.Globals.loading.show("Saving...");

				updateCashflowTemplate();
			});

		};

		activity.invalidateOptionsMenu();

	}

};

function updateCashflowTemplate() {

	//Ti.API.info("CASHFLOW TEMPLATE: " + JSON.stringify(jsonCashflowTemplate));

	jsonCashflowTemplate.id = null;
	jsonCashflowTemplate.name = $.titolo_cashflow.value;
	jsonCashflowTemplate.description = $.titolo_cashflow.value;
	jsonCashflowTemplate.referenceTime = +moment(args.p_reference_time);
	jsonCashflowTemplate.category = args.p_categoria;
	jsonCashflowTemplate.data.descrizioneBreve = $.titolo_cashflow.value;
	jsonCashflowTemplate.data.descrizioneLunga = $.titolo_cashflow.value;
	jsonCashflowTemplate.data.dataOperazione = dataMovimento;
	jsonCashflowTemplate.data.importo = $.importo.value;
	jsonCashflowTemplate.data.tipoMovimento = tipoMovimento;
	jsonCashflowTemplate.data.fonteLiquidita = selectedCashsource;
	jsonCashflowTemplate.data.strumentoPagamentoIncasso = selectedPaymentTakingTool;
	jsonCashflowTemplate.data.statoMovimento = selectedStato;
	jsonCashflowTemplate.data.tipoVariabilita = selectedVariabilita;
	jsonCashflowTemplate.data.modalitaPagamento = selectedPaymentMode;
	jsonCashflowTemplate.data.flagOrdinarioStraordinario = ordinario;
	jsonCashflowTemplate.data.flagDichiarazioneRedditi = dichRedditi;
	jsonCashflowTemplate.data.dataValuta = dataValuta;
	jsonCashflowTemplate.data.dataScadenza = dataScadenza;
	jsonCashflowTemplate.data.dataPagamentoIncasso = dataPagInc;
	
	Alloy.Globals.loading.hide();
	//Alloy.Collections.Timeline.unshift(response);
	
	//Ti.API.info("CASHFLOW DA AGGIUNGERE: "+JSON.stringify(jsonCashflowTemplate));
	$.insermiento_cashflow.close();
	args._callback(JSON.stringify(jsonCashflowTemplate));

}

function formattaImporto(e) {
	e.source.value = parseFloat(e.source.value).toFixed(2);
	//e.source.value = parseInt(e.source.value);
	
}

function toggleAltro(e) {
	$.altro_container.visible = !$.altro_container.visible;
}

function openDataMovimentoSelector(e) {

	var date_time_pickers = Alloy.createController("date_time_selector", function(o) {

		//Ti.API.info("DATA SELEZIONATA: " + moment(o).format("LLL"));
		$.data_movimento.text = moment(o).format("LL") + " alle ore " + moment(o).format("HH:mm");
		dataMovimento = +moment(o);

	}).getView();

	Alloy.Globals.navMenu.openWindow(date_time_pickers);

}

function openCashSourcesSelector() {

	var selectCashSource = Alloy.createController("selezione_cashsources", function(cat_obj) {

		$.cashsources.text = cat_obj.descrizioneBreve;
		selectedCashsource = cat_obj;

	}).getView();

	Alloy.Globals.navMenu.openWindow(selectCashSource);

}

function openCashSourcesSelector_da() {

	var selectCashSource = Alloy.createController("selezione_cashsources", function(cat_obj) {

		$.mov_da.text = cat_obj.descrizioneBreve;
		mov_da = cat_obj;

	}).getView();

	Alloy.Globals.navMenu.openWindow(selectCashSource);

}

function openCashSourcesSelector_a() {

	var selectCashSource = Alloy.createController("selezione_cashsources", function(cat_obj) {

		$.mov_a.text = cat_obj.descrizioneBreve;
		mov_a = cat_obj;

	}).getView();

	Alloy.Globals.navMenu.openWindow(selectCashSource);

}

function openPaymentModesSelector() {

	var selectPaymentModes = Alloy.createController("selezione_paymentmodes", function(cat_obj) {

		$.payment_modes.text = cat_obj.descrizioneBreve;
		selectedPaymentMode = cat_obj;

	}).getView();

	Alloy.Globals.navMenu.openWindow(selectPaymentModes);

}

function openPaymentModesSelector_tramite() {

	var selectPaymentModes = Alloy.createController("selezione_paymentmodes", function(cat_obj) {

		$.tramite.text = cat_obj.descrizioneBreve;
		selectedTramite = cat_obj;

	}).getView();

	Alloy.Globals.navMenu.openWindow(selectPaymentModes);

}

function openPaymentTakingToolsSelector() {

	var selectPaymentTakingTools = Alloy.createController("selezione_paymenttakingtools", function(cat_obj) {

		$.payment_taking_tool.text = cat_obj.descrizioneBreve;
		selectedPaymentTakingTool = cat_obj;

	}).getView();

	Alloy.Globals.navMenu.openWindow(selectPaymentTakingTools);

}

function openPaymentTakingToolsSelector_con() {

	var selectPaymentTakingTools = Alloy.createController("selezione_paymenttakingtools", function(cat_obj) {

		$.con.text = cat_obj.descrizioneBreve;
		selectedCon = cat_obj;

	}).getView();

	Alloy.Globals.navMenu.openWindow(selectPaymentTakingTools);

}

function statoSelector() {

	var selectStato = Alloy.createController("selezione_cashflowstatuses", function(cat_obj) {

		$.stato.text = cat_obj.descrizioneBreve;
		selectedStato = cat_obj;

	}).getView();

	Alloy.Globals.navMenu.openWindow(selectStato);

}

function variabilitaSelector() {

	var selectVariabilita = Alloy.createController("selezione_cashflowvariabilities", function(cat_obj) {

		$.variabilita.text = cat_obj.descrizioneBreve;
		selectedVariabilita = cat_obj;

	}).getView();

	Alloy.Globals.navMenu.openWindow(selectVariabilita);

}

function openDataValutaSelector(e) {

	var date_time_pickers = Alloy.createController("date_time_selector", function(o) {

		//Ti.API.info("DATA SELEZIONATA: " + moment(o).format("LLL"));
		$.data_valuta.text = moment(o).format("LL") + " alle ore " + moment(o).format("HH:mm");
		dataValuta = +moment(o);

	}).getView();

	Alloy.Globals.navMenu.openWindow(date_time_pickers);

}

function openDataScadenzaSelector(e) {

	var date_time_pickers = Alloy.createController("date_time_selector", function(o) {

		//Ti.API.info("DATA SELEZIONATA: " + moment(o).format("LLL"));
		$.data_scadenza.text = moment(o).format("LL") + " alle ore " + moment(o).format("HH:mm");
		dataScadenza = +moment(o);

	}).getView();

	Alloy.Globals.navMenu.openWindow(date_time_pickers);

}

function openDataPagIncSelector(e) {

	var date_time_pickers = Alloy.createController("date_time_selector", function(o) {

		//Ti.API.info("DATA SELEZIONATA: " + moment(o).format("LLL"));
		$.data_pag_inc.text = moment(o).format("LL") + " alle ore " + moment(o).format("HH:mm");
		dataPagInc = +moment(o);

	}).getView();

	Alloy.Globals.navMenu.openWindow(date_time_pickers);

}

function redditiSelector() {
	$.opzioni_redditi.show();
}

function redditiSelected(e) {

	if (!e.button) {
		switch(e.source.selectedIndex) {
		case 0:

			dichRedditi = true;
			$.redditi.text = "Rilevante";

			break;
		case 1:

			dichRedditi = false;
			$.redditi.text = "Non Rilevante";

			break;

		}
	}

}

function ordinarioSelector() {
	$.opzioni_straordinario.show();
}

function ordinarioSelected(e) {

	if (!e.button) {
		switch(e.source.selectedIndex) {
		case 0:

			ordinario = false;
			$.ordinario.text = "Ordinario";

			break;
		case 1:

			ordinario = true;
			$.ordinario.text = "Straordinario";

			break;

		}
	}

}

