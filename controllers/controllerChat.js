var mongoose  =  require('mongoose');
var appcontactus =  mongoose.model('appcontactus');
var chat =  mongoose.model('chatUsers');
var decrypt = require('./controllerRequestsBoxo');
exports.saveMessage = function(req, res) {
        var newChat = chat({
          dbB_chatId:     req.body.idChat,
          dbB_chatUserId: req.body.usuario,
          dbB_dateSend :  req.body.fecha,
          dbB_message:    req.body.mensaje,
	  dbB_nickname:   req.body.nickname
        })
        newChat.save(function(err, chat) {
       if(err) { return res.status(500).send(err.message); }
          return res.status(200).send("(Y)");
    });
}
exports.infoChat = function(req, res){
    chat.find({dbB_chatId : req.body.chatId}, function(err, messages) {
        if(err) { res.send(500, err.message); }
        res.status(200).send(messages);
    });
}

