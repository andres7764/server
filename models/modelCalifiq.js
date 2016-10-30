var mongoose = require('mongoose'),

//RequestBoxo collection
requestedBoxoMensg = new mongoose.Schema({
  dbB_usercalifiq:           {  type: mongoose.Schema.ObjectId, ref: "boxousers" },
  dbB_datetime:              { type: String },
  dbB_points:                { type: String },
  dbB_comments:              { type: String },
  dbB_packageId:             { type: String },
  dbB_userToCalifiq:	     { type: String }
});

module.exports = mongoose.model('califications',requestedBoxoMensg);
