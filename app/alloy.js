// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Alloy.Globals.winTop = (OS_IOS && parseInt(Ti.Platform.version, 10) >= 7) ? 20 : 0;

var zzAPI = require("ti.zz.api");

ZZ = zzAPI.ZZ;

Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");

Alloy.Models.Post = new Backbone.Model;

var Timeline = Backbone.Collection.extend({

	comparator : function(model) {
		return -model.get('referenceTime');
	}
});

Alloy.Collections.Timeline = new Timeline();
Alloy.Collections.categorie = new Backbone.Collection;
Alloy.Collections.aspettoEvento = new Backbone.Collection;
Alloy.Collections.aspettiCashflow = new Backbone.Collection;
Alloy.Collections.aspettiDocument = new Backbone.Collection;
Alloy.Collections.aspettiLink = new Backbone.Collection;
Alloy.Collections.aspettiNote = new Backbone.Collection;

Alloy.Models.Template = new Backbone.Model;
Alloy.Models.Post_template = new Backbone.Model;
Alloy.Models.Event_template = new Backbone.Model;
Alloy.Models.Cashflow_template = new Backbone.Model;
Alloy.Models.Document_template = new Backbone.Model;
Alloy.Models.Note_template = new Backbone.Model;
Alloy.Models.Link_template = new Backbone.Model;
Alloy.Models.Communication_template = new Backbone.Model;

Alloy.Globals.Moment_IT = {
	months : "Gennaio_Febbraio_Marzo_Aprile_Maggio_Giugno_Luglio_Agosto_Settembre_Ottobre_Novembre_Dicembre".split("_"),
	monthsShort : "Gen_Feb_Mar_Apr_Mag_Giu_Lug_Ago_Set_Ott_Nov_Dic".split("_"),
	weekdays : "Domenica_LunedÃ¬_MartedÃ¬_MercoledÃ¬_GiovedÃ¬_VenerdÃ¬_Sabato".split("_"),
	weekdaysShort : "Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),
	weekdaysMin : "D_L_Ma_Me_G_V_S".split("_"),
	longDateFormat : {
		LT : "HH:mm",
		L : "DD/MM/YYYY",
		LL : "D MMMM YYYY",
		LLL : "D MMMM YYYY LT",
		LLLL : "dddd, D MMMM YYYY LT"
	},
	calendar : {
		sameDay : '[Oggi alle] LT',
		nextDay : '[Domani alle] LT',
		nextWeek : 'dddd [alle] LT',
		lastDay : '[Ieri alle] LT',
		lastWeek : '[lo scorso] dddd [alle] LT',
		sameElse : 'L'
	},
	relativeTime : {
		future : function(s) {
			return ((/^[0-9].+$/).test(s) ? "tra" : "in") + " " + s;
		},
		past : "%s fa",
		s : "alcuni secondi",
		m : "un minuto",
		mm : "%d minuti",
		h : "un'ora",
		hh : "%d ore",
		d : "un giorno",
		dd : "%d giorni",
		M : "un mese",
		MM : "%d mesi",
		y : "un anno",
		yy : "%d anni"
	},
	ordinal : '%dÂº',
	week : {
		dow : 1, // Monday is the first day of the week.
		doy : 4 // The week that contains Jan 4th is the first week of the year.
	}
};

var moment = require('alloy/moment');
moment.lang('it', Alloy.Globals.Moment_IT);
moment.lang('it');