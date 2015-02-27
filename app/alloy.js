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