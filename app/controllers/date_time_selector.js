var args = arguments[0] || {};

var soloData = moment().format('YYYY-MM-DD');
var soloOra = moment().format('HH:mm:ss');

function doOpen() {
	
	
	 $.date_picker.value = new Date();
	 $.time_picker.value = new Date();
	 
	 
	 //$.date_picker.minDate = new Date(2009, 0, 1);
	 //$.date_picker.maxDate = new Date(2014, 11, 31);
	 
}

function changeDate(e) {
	
	soloData = moment(e.value).format('YYYY-MM-DD');
	//Ti.API.info('Date selected: ' + soloData);
	
}

function changeTime(e) {
	
	soloOra = moment(e.value).format('HH:mm:ss');
	//Ti.API.info('Time selected: ' + soloOra);
}

function selectDateTime() {
	
	
	var dataCompleta = soloData.toString() + "T" + soloOra.toString();
	//Ti.API.info("STRINGHE DATA COMBINATE : "+dataCompleta);
	var finalData = moment(dataCompleta);
	args(dataCompleta);
	$.pickersWindow.close();
}
