var mongoose = require('mongoose'),

//User collection
chatUsers = new mongoose.Schema({
  dbB_chatId:         { type: String },
  dbB_chatUserId:     { type: String },
  dbB_dateSend :      { type: String },
  dbB_message:        { type: String },
  dbB_band:           { type: String },
  dbB_nickname:	      { type: String }
});

module.exports = mongoose.model('chatUsers',chatUsers);
