exports.openCamera = function(_callback) {

	var ImageFactory = require('ti.imagefactory');

	try {

		Ti.Media.showCamera({
			success : function(event) {

				var cropRect = event.cropRect;
				var image = event.media;

				var newBlob = ImageFactory.compress(image, 0.20);
				//Alloy.Globals.blobImage = newBlob;
				_callback(image);
				/*
				 // called when media returned from the camera
				 Ti.API.info('Our type was: ' + event.mediaType);

				 $.preview.image = newBlob;
				 var hashedImage = "data:image/jpeg;base64," + Ti.Utils.base64encode(newBlob).toString();
				 var tempFile = Ti.Filesystem.createTempFile();
				 tempFile.write(newBlob);

				 //Ti.API.info("HASHED IMAGE : " + hashedImage);
				 Ti.API.info("HASHED IMAGE MIME TYPE: " + image.getMimeType());
				 Ti.API.info("IMAGE FILE SIZE: " + tempFile.size);
				 Ti.API.info("IMAGE FILE NAME: " + tempFile.name);

				 imageContent.base64 = hashedImage;
				 fileSize = tempFile.size;
				 fileName = tempFile.name;
				 */

			},
			cancel : function() {
				return;
			},
			error : function(error) {
				// called when there's an error
				var a = Titanium.UI.createAlertDialog({
					title : 'Camera'
				});
				if (error.code == Titanium.Media.NO_CAMERA) {
					a.setMessage('Impossibile attivare la funzione foto su questo dispositivo');
				} else {
					a.setMessage('Unexpected error: ' + error.code);
				}
				a.show();
				return;
			},
			saveToPhotoGallery : true,
			// allowEditing and mediaTypes are iOS-only settings
			allowEditing : false,
			mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
		});
	} catch(error) {
		Ti.API.info("CATCHED ERROR: " + error);
	}

};

exports.openGallery = function(_callback) {

	var ImageFactory = require('ti.imagefactory');

	Titanium.Media.openPhotoGallery({

		success : function(event) {
			var cropRect = event.cropRect;
			var image = event.media;
			//Alloy.Globals.blobImage = image;

			// set image view
			Ti.API.info('Our type was: ' + event.mediaType);
			//$.preview.setWidth(cropRect.width);
			//$.preview.setHeight(cropRect.height);

			var newBlob = ImageFactory.compress(image, 0.20);
			//Alloy.Globals.blobImage = newBlob;

			//var hashedImage = Ti.Utils.base64encode(image).toString();
			//Ti.API.info("HASHED IMAGE: " + image.getFile());
			Ti.API.info("IMAGE MIME TYPE: " + image.getMimeType());

			var tempFile = Ti.Filesystem.createTempFile();
			tempFile.write(image);

			//var content = tempFile.read();
			Ti.API.info("IMAGE  FILE SIZE: " + tempFile.size);
			Ti.API.info("IMAGE FILE NAME: " + tempFile.name);
			//Ti.API.info("HASHED IMAGE : " + hashedImage);

			var fileSize = tempFile.size;
			var fileName = tempFile.name;

			//Ti.API.info("BLOB: " + JSON.stringify(newBlob));

			_callback(image);

			Titanium.API.info('PHOTO GALLERY SUCCESS cropRect.x ' + cropRect.x + ' cropRect.y ' + cropRect.y + ' cropRect.height ' + cropRect.height + ' cropRect.width ' + cropRect.width);

		},
		cancel : function() {

		},
		error : function(error) {
			Ti.API.info("ERROR: " + error);
		},
		allowEditing : false,

		mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
	});
};

exports.extractCategoryIcons = function(code) {

	switch(code) {

	case null:
		return ( {
			icona : icons.question,
			colore : "#E6E6E6"
		});
		break;

	case "01":
		return ( {
			icona : icons.money,
			colore : "#38e8c6"
		});
		break;
	case "03":
		return ( {
			icona : icons.briefcase,
			colore : "#5a9dd0"
		});
		break;
	case "04":
		return ( {
			icona : icons.home,
			colore : "#ffd651"
		});
		break;
	case "05":
		return ( {
			icona : icons.car,
			colore : "#FFDD01"
		});
		break;
	case "06":
		return ( {
			icona : icons.plug,
			colore : "#a6c4bc"
		});
		break;
	case "07":
		return ( {
			icona : icons.stethoscope,
			colore : "#6cc"
		});
		break;
	case "08":
		return ( {
			icona : icons.users,
			colore : "#F44336"
		});
		break;
	case "09":
		return ( {
			icona : icons.glass,
			colore : "#fce295"
		});
		break;
	case "10":
		return ( {
			icona : icons.question_sign,
			colore : "#f8bc7c"
		});
		break;
	case "11":
		return ( {
			icona : icons.camera,
			colore : "#aeaeae"
		});
		break;
	case "12":
		return ( {
			icona : icons.graduation_cap,
			colore : "#0c0"
		});
		break;
	case "13":
		return ( {
			icona : icons.user,
			colore : "#CCEEFF"
		});
		break;
	case "14":
		return ( {
			icona : icons.money,
			colore : "#11BFBC"
		});
		break;
	case "15":
		return ( {
			icona : icons.money,
			colore : "#FF0000"
		});
		break;
	case "16":
		return ( {
			icona : icons.asterisk,
			colore : "#FAEBD7"
		});
		break;
	case "17":
		return ( {
			icona : icons.plane,
			colore : "#38e8c6"
		});
		break;
	case "18":
		return ( {
			icona : icons.car,
			colore : "#FFDD01"
		});
		break;
	default:
		return ( {
			icona : icons.question,
			colore : "#ff0000"
		});
		break;

	}

};

