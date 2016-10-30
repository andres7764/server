var gcm = require('node-gcm');
var message = new gcm.Message();
var sender = new gcm.Sender('AIzaSyB16TjuJdE7VYePlgr9jO0ll2i42_frtDo'); //API Server Key
//var registrationIds = [];

exports.sendNotificationToAll = function(array, tipo, direccion) {
var registrationIds = [];
/* Tipos de notificaciones:
	1: Todos
	2: Solo el que solicitó el pedido
	3: Aviso de chat
        4: Pedido entregado
	5: Pedido cancelado
*/

var number = Math.floor(Math.random()*10000);
for(i = 0; i < array.length; i++) {
	if(tipo == 1){
	   message.addData('message', "Se ha creado un nuevo pedido en la direccion: "+direccion);
	   message.addData('title','Nuevo pedido creado');
	} else if(tipo == 2){
 	   message.addData('message',"Tu pedido ha sido aceptado por un boxomensajero ingresa a mi cuenta y ponte en contacto con el");
	   message.addData('title','cambio de estado en tu pedido' );		
	} else if(tipo == 3) {
   	   message.addData('message',"El usuario x ha escrito");
	   message.addData('title','Mensaje de chat' );	
	} else  if(tipo == 4){
           message.addData('message',"El pedido ya fue entregado al destinatario");
           message.addData('title','Pedido completado');
        } else if(tipo == 5) {
           message.addData('message',"El pedido ha sido cancelado por el boxoMensajero");
           message.addData('title','Pedido cancelado');
        }
	//message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app - may not work
	//message.collapseKey = 'demo';
         message.addData('notId', number);	
         message.delayWhileIdle = true; //Default is false
	 message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.
 	 registrationIds.push(array[i].dbB_tokenDevice); 
/*
	 * Parameters: message-literal, registrationIds-array, No. of retries, callback-function
*/
}
	sender.send(message, registrationIds, 4, function (result) {
	//console.log(result);
	});
 // }
}
