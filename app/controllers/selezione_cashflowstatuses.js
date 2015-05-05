var args = arguments[0] || {};

var search = Alloy.createController("search_view").getView();
$.cashflowStatusesTable.search = search;

//Ti.API.info("ATR: "+JSON.stringify(Alloy.Collections.categorie));

function hideActionBar (){
    // Grab the window's action bar instance and call the hide method
	$.win.activity.onCreateOptionsMenu = function(e) {
        e.menu.add({
            title: "Table Search",
            icon: (Ti.Android.R.drawable.ic_menu_search ? Ti.Android.R.drawable.ic_menu_search : "my_search.png"),
            actionView: search,
            showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS | Ti.Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW
        });
   };
    $.win.activity.invalidateOptionsMenu();
};

syncCollection();

function selectItem(e){
	
	args(Alloy.Collections.CashflowStatuses.at(e.index).attributes);
	$.win.close({
		animate : true
	});
	
	//Ti.API.info("ATR: "+JSON.stringify(Alloy.Collections.categorie.at(e.index).attributes));
}
