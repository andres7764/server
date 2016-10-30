//document.write();
// set up ==============================================================================
	var express  = require('express');
	var app      = express();
	var mongoose = require('mongoose');
	var morgan = require('morgan');
	var bodyParser = require('body-parser');
	var methodOverride = require('method-override');
	var argv = require('optimist').argv;
  	var http = require('http').Server(app);
	var io = require('socket.io')(http);
  	var cors = require('cors');
// configuration ======================================================================
	//mongoose.connect('mongodb://' + argv.be_ip + ':80/boxoApp');
	mongoose.connect('mongodb://localhost/boxoApp');
 	//app.use('/public', express.static(__dirname + '/public'));
 	app.use(cors());
 	app.use(express.static('public'));
 	//app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + "/public/photos" }));
 	app.use(express.static('/'));
 	app.use('/bower_components', express.static(__dirname + '/bower_components'));
	app.use(morgan('dev')); 										// log every request to the console
	app.use(bodyParser.urlencoded({ extended : true})); 			// parse application/x-www-form-urlencoded
	app.use(bodyParser.json()); 									// parse application/json
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
	app.use(methodOverride());

//Include the models and controllers of the app =======================================
  require('./models/modelBdBoxo');
  require('./models/modelAppGeneral');
  require('./models/modelBdRequest');
  require('./models/cancelForm');
  require('./models/modelCalifiq.js');
  require('./models/modelChat.js');
  require('./models/modelDirUsers.js');

  var controllerUser = require('./controllers/controllerUser');
  var appGeneral = require('./controllers/controllerApp');
  var appRequestBoxo = require('./controllers/controllerRequestsBoxo');
  var controllerChat = require('./controllers/controllerChat');
  var controllerNotifications = require('./controllers/controllerNotifications');
  var controllerDirections = require('./controllers/controllerDirs');
//var middleware = require('./public/helpers/middleware');

//Create routes by server rest API ====================================================
app.post('/auth/twitter', controllerUser.loginTwitter);
app.post('/auth/signUp', controllerUser.addNewUser);
app.post('/auth/login', controllerUser.verifyLogin);
app.post('/auth/userAvailable',controllerUser.userAvailable);
app.get('/info/users', controllerUser.showAllUsers);
app.post('/info/saveContactUs', appGeneral.saveInfoContacUs);
app.post('/boxo/cancelForm', appGeneral.cancelForm);
app.post('/boxo/saveRequestBoxo', appRequestBoxo.saveBoxoRequest);
app.post('/boxo/getAllBoxo', appRequestBoxo.showAllBoxoRequest);
app.post('/boxo/obtainPackageInfo', appRequestBoxo.obtainPackageInfo);
app.post('/boxo/aceptTheDeal', appRequestBoxo.aceptTheDeal);
app.post('/boxo/deliveriesUser', appRequestBoxo.deliveriesUser);
app.post('/boxo/sentsUser', appRequestBoxo.sentsUser);
app.post('/boxo/cancelPackage', appRequestBoxo.cancelPackage);
app.post('/boxo/changeStatusPackage', appRequestBoxo.changeStatusPackage);
app.post('/boxo/requestComplete', appRequestBoxo.requestComplete);
app.post('/boxo/califiqMens', appRequestBoxo.califBoxoMens);
app.post('/boxo/uploadFile', appGeneral.uploadFiles);
app.post('/boxo/userAccount', controllerUser.userAccount);
app.post('/boxo/getCalifications', controllerUser.getCalifications);
app.post('/boxo/infoChat',controllerChat.infoChat);
//app.get('/boxo/notifications',controllerNotifications.sendNotification);
app.post('/boxo/saveDirections',controllerDirections.saveDirections);
app.post('/boxo/showDirections',controllerDirections.findDirections);
app.post('/boxo/updatePass',controllerUser.updatePass);
app.post('/boxo/deleteDir',controllerDirections.deleteDirection);
app.post('/boxo/updatePhoto',controllerUser.updatePhoto);
app.post('/boxo/addChat',controllerChat.saveMessage);
app.post('/boxo/bringInfo',appRequestBoxo.bringAllInfo);
app.post('/boxo/logout',controllerUser.logout);

//Functionality of the real time ======================================================
var socketUsers = {};
var counter = 11;
  io.on('connection', function(socket) {
    console.log("New socket abierto!");
    counter++;
    socket.on('boxo-request', function(pull,direccion) {
	if(direccion !== null){
	    controllerUser.showAllUsers(direccion);
	}
      io.emit('boxo-request', pull);

    });
   socket.on('createChat', function(idChat){
        socket.join(idChat);
        io.sockets.in(idChat).emit('sendMessage', {mensaje:'Bienvenido al chat', tipo: 'bienvenida'});
  });
  socket.on('sendMessage',function(infoMessage){
        io.sockets.in(infoMessage.idChat).emit('sendMessage', infoMessage);
  });
  socket.on('disconnect', function() {
    console.log("desconectado!");
    socket.leave();
  });
        })
// application ======================================================================
	app.get('/', function(req, res) {
		res.sendFile('index.html');
	});

  app.get('/home',function(req,res){
    res.render('home.html');
  })

// listen (start app with node server.js) ===========================================
	//http.listen(8080, argv.fe_ip);
	http.listen(8080);
	console.log("App listening on port 8080");

