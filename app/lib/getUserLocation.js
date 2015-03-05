Titanium.Geolocation.purpose = 'Get User Location';

function stringify(obj) {

	var arr = [], itm;
	for (itm in obj) {
		arr.push(itm + "=" + escape(obj[itm]));
	};
	return arr.join("&");
};

function download(obj) {

	var xhr = Ti.Network.createHTTPClient();
	var strMode = (obj.method || 'POST');
	if (obj.success) {
		xhr.onload = function(e) {
			json = JSON.parse(this.responseText);
			obj.success(json);
		};
	};
	if (obj.error) {
		xhr.onerror = function(e) {
			obj.error(e);
		};
	};

	if (strMode === 'POST') {
		xhr.open(strMode, obj.url);
		xhr.send(obj.param);
	} else {
		xhr.open(strMode, obj.url + '?' + stringify(obj.param));
		xhr.send();
	}
};

function lookup(obj) {

	download({
		url : "http://maps.google.com/maps/api/geocode/json",
		method : 'GET',
		param : {
			address : obj.address,
			region : obj.region || 'it',
			language : 'it',
			sensor : true
		},
		success : function(json) {
			if (json.results.length > 0) {
				if (obj.success) {
					obj.success({
						lat : json.results[0].geometry.location.lat,
						lon : json.results[0].geometry.location.lng,
						address : json.results[0].formatted_address
					});
				}
			} else {
				if (obj.error) {
					obj.error();
				}
			}
		},
		error : function(json) {
			if (obj.error) {
				obj.error();
			}
		}
	});
};

exports.reverseGeo = function(_callback) {

	if (Ti.Geolocation.locationServicesEnabled) {

		Titanium.Geolocation.getCurrentPosition(function(e) {
			if (e.error) {
				Ti.API.error('Error: ' + e.error);
			} else {

				var latitude = e.coords.latitude;
				var longitude = e.coords.longitude;

				Ti.API.info("LAT: " + latitude);
				Ti.API.info("LON: " + longitude);

				lookup({
					address : latitude + "," + longitude,
					success : function(e) {
						_callback({
							latitude : e.lat,
							longitude : e.lon,
							address : e.address

						});
						Ti.API.info('Rev Geocoding Success: ' + JSON.stringify(e));
					},
					error : function(e) {
						alert('Error');
					}
				});

				/*

				Ti.Geolocation.reverseGeocoder(latitude, longitude, function(g) {

				Ti.API.info("RISULTATO REV GEOCODING: " + JSON.stringify(g));

				if (!_.isUndefined(g.places)) {
				_callback({
				latitude : latitude,
				longitude : longitude,
				address : g.places[0].displayAddress

				});
				} else {

				alert("Errore nel rilevamento della posizione");
				}
				});
				*/

				//Alloy.Globals.usr_longitude = e.coords.longitude;
				//Alloy.Globals.usr_latitude = e.coords.latitude;
				//Ti.API.info("LOCATION: Longitudine: " + Alloy.Globals.usr_longitude + " Latitudine: " + Alloy.Globals.usr_latitude);

			}
		});

	} else {
		alert('Servizi di localizzazione non abilitati!');
	}

};

exports.forwardGeo = function(address, _callback) {

	if (Ti.Geolocation.locationServicesEnabled) {

		lookup({
			address : address,
			region : 'it',
			success : function(e) {
				_callback({
					latitude : e.lat,
					longitude : e.lon,
					address : e.address

				});
				Ti.API.info('Frwrd Geocoding Success: ' + JSON.stringify(e));
			},
			error : function(e) {
				alert('Nessun risultato dalla ricerca');
			}
		});

	} else {
		alert('Servizi di localizzazione non abilitati!');
	}

};
