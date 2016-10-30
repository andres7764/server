var mongoose  =  require('mongoose');
var appcontactus =  mongoose.model('appcontactus');
var appCancelForm =  mongoose.model('cancelform');
var path = require('path'),
  	fs = require('fs');


//POST - Insert a new user in the Collection
exports.saveInfoContacUs = function(req, res) {
    var newContactInfo = new appcontactus({
        dbB_name: req.body.name,
        dbB_email: req.body.email,
        dbB_comments: req.body.text,
        dbB_dateTime: req.body.fecha
    });
    newContactInfo.save(function(err, comments) {
        if(err) { return res.status(500).send(err.message); }
           return res.status(200).jsonp(comments);
    });
}


exports.cancelForm = function(req, res){
	var appCancForm = new appCancelForm({
		dbB_optionSelected: req.body.option,
		dbB_comments: req.body.comments,
		dbB_date: req.body.dateTime,
		dbB_sendId: req.body.packageId
	});
	appCancForm.save(function(err,cancelF){
		if(err) { return res.status(500).send(err.message) }
		return res.status(200).send("Gracias por tu información");
	})
}

exports.uploadFiles = function (req, res){
	//var file = req.files.file;
	console.log(req.files);
	console.log(req.body);
	console.log(file);
	/*name = file.name,
	      type = file.type,
	      path = __dirname + "/public/photos/" + name;
*/
/*	  fs.rename(file.path, path, function(err){
	    if(err) res.send("Ocurrio un error al intentar subir la imagen");
	    res.end("Ver imagen");
	  });*/
}
