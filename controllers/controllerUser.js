var mongoose  =  require('mongoose');
var ObjectId  = mongoose.Schema.ObjectId;
var jwt       =  require('jwt-simple');
var moment    =  require('moment');
var qs        =  require('querystring');
var service   =  require('../public/helpers/services');
var config    =  require('../public/secret.json');
var request   =  require('request');
var notification   =  require('./controllerNotifications');
console.log(notification);
var BoxoUsers =  mongoose.model('boxousers');
var califications = mongoose.model('califications');
//Boxo - New App
//GET - Return all usersBD in the DB (The colection of users)

exports.showAllUsers = function(direction) {
var objeto = [];
var query = BoxoUsers.find({},'dbB_tokenDevice dbB_nickname');
    query.where('dbB_typeRol','BoxoMensajero')
    query.exec(function(err,result){
       notification.sendNotificationToAll(result,1,direction);
    });
};

//POST - Insert a new user in the Collection
exports.addNewUser = function(req, res) {
    var fecha = req.body.fechaNacido;
    fecha = fecha.split("T");
    var newUser = new BoxoUsers({
        dbB_nameUsr:     	req.body.nombre,
        dbB_ltNameUsr:     	req.body.apellido,
        dbB_dateBorn:  		fecha[0],
        dbB_nickname:   	req.body.usuario,
        dbB_password:  	 	req.body.contrasena,
        dbB_cities:  		req.body.ciudad,
        dbB_locationSaved:  req.body.ubicacion,
        dbB_typeRol:  		req.body.rol,
        dbB_email:  		req.body.email,
        dbB_fechaRegistro: req.body.fechaRegistro,  
        dbB_photo:      req.body.fotoUsuario,
        dbB_tokenDevice: req.body.tokenDisp,
        dbB_routeRecibo:   req.body.recibo,
        dbB_routeCedula:    req.body.cedula,
        dbB_routeform:      req.body.formulario,
        dbB_routeArl:       req.body.arl,
        dbB_routeEps:       req.body.eps
    });
    newUser.save(function(err, newUser) {
        if(err) { return res.status(500).send(err.message); }
           return res.status(200).send({token: service.createToken(newUser)});
    });
};

exports.deleteUser = function(req, res) {
        BoxoUsers.findById(req.params.id, function(err, boxoUser) {
        boxoDb.remove(function(err) {
        if(err)
          //  return res.status(500).send(err.message);
      	res.status(200).send({token: service.createToken(boxoUser)});
        })
    });
};

//GET - Return a user for login
exports.verifyLogin = function(req, res) {
    BoxoUsers.findOne({dbB_nickname : req.body.username}, function(err, user) {
    if(err) {
      return res.status(500).send('Usuario no válido, intente de nuevo');
    } else {
      if (user !== null) {
        if (user.dbB_password === req.body.password){
          return res.status(200).send({token: service.createToken(user)})
        } else {
          return res.status(404).send("Contraseña incorrecta, intente de nuevo"); 
        }
      } else {
        return res.status(404).send("El usuario no existe");
      }
    }
    });
};

exports.userAvailable = function (req, res) {
BoxoUsers.findOne({dbB_nickname: req.body.username}, function (err, available){
  if (err) { return res.status(500).send("No se pudo realizar la consulta") }
    if (available !== null && available.dbB_nickname.length > 3){
      return res.status(201).send("Usuario en uso");
    } else { return res.status(200).send("Usuario disponible") }
});
}

exports.loginTwitter = function(req, res) {
  var requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
  var accessTokenUrl  = 'https://api.twitter.com/oauth/access_token';
  var authenticateUrl = 'https://api.twitter.com/oauth/authenticate';

  // First request: no auth token present
  if (!req.body.oauth_token || !req.body.oauth_verifier) {
    var requestTokenOauth = {
      consumer_key: config.TWITTER_KEY,
      consumer_secret: config.TWITTER_SECRET
    };

    // Retrieve a Twitter Token and redirect to Twitter auth page
    request.post({ url: requestTokenUrl, oauth: requestTokenOauth }, function(err, response, body) {
      res.send(qs.parse(body));
    });
  } else {
    var accessTokenOauth = {
      consumer_key: config.TWITTER_KEY,
      consumer_secret: config.TWITTER_SECRET,
      token: req.body.oauth_token,
      verifier: req.body.oauth_verifier
    };

    // Check the token against Twitter and send JWT to app
    request.post({ url: accessTokenUrl, oauth: accessTokenOauth }, function(err, response, resData) {
      // Additional info from user should be retrieved here (from a local db etc.)
      res.send({ token: createJWT(qs.parse(resData).user_id) });
    });
  }
}


function createJWT(userId) {
  var payload = {
    sub: userId,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

decryptFile = function(user){
  var token = user.split(" ")[0];
  var user = jwt.decode(token, config.TOKEN_SECRET);
  return user;
}

exports.userAccount = function(req,res){
  var user = decryptFile(req.body.userId);
  BoxoUsers.findOne({_id: user.sub}, function (err, information){
  if (err) { return res.status(500).send("No se pudo realizar la consulta") }
  return res.status(200).send(information);
  });
}

exports.getCalifications = function(req, res){
var fill = [];
 var user = decryptFile(req.body.userId);
  califications.find().exec(function(err,bn){

for(var i = 0; i < bn.length; i++){
  if(bn[i].dbB_usercalifiq == user.sub){
	fill.push(bn[i]);
  }
}
return res.status(200).send(fill);
})


/*califications.find({"dbB_usercalifiq" : ObjectId(user.sub)}, function (err, information){
  if (err) { return res.status(500).end("No se pudo realizar la consulta") }  
 console.log(information);
return res.status(200).send(information);
  });
*/
}

exports.updatePass = function(req, res){
    BoxoUsers.update({_id: req.body.id},{ $set: { 'dbB_password': req.body.password}}).exec(function(err, data){
    res.status(200).end("Contraseña cambiada correctamente");
  });
}

exports.updatePhoto = function(req, res){
      BoxoUsers.update({_id: req.body.user},{ $set:  { 'dbB_photo': req.body.photo }}).exec(function(err,data){
      res.send(200).end("¡Imagen cambiada correctamente!");
    })
}

exports.logout = function(req, res){
console.log(req.body.status);
	if(req.body.status == 1){
		BoxoUsers.update({_id: req.body.id},{ $set:  { 'dbB_tokenDevice': "" }}).exec();
	} else {
     		BoxoUsers.update({_id: req.body.id},{ $set:  { 'dbB_tokenDevice': req.body.token }}).exec();
 	}
}
