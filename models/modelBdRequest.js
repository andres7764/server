var mongoose = require('mongoose'),

//RequestBoxo collection
requestedBoxoMensg = new mongoose.Schema({
  dbB_locationPackage:            { type: String },
  dbB_addLocationPackage:         { type: String },
  dbB_destinPackage :             { type: String },
  dbB_addDestinPackage:           { type: String },
  dbB_mount:                      { type: String },
  dbB_distance:                   { type: String },
  dbB_commentsSend:               { type: String },
  dbB_userRequest:                { type: String }, // who request the send
  dbB_userBringPackage:           { type: String },
  dbB_paqueteLng:                 { type: String },
  dbB_paqueteLat:                 { type: String },
  dbB_destinoLat:                 { type: String },
  dbB_destinoLng:                 { type: String },
  dbB_orderStatus:                { type: String },
  dbB_dateTime:                   { type: String },
  dbB_weight:                     { type: String },
  dbB_commentsMensjero:           { type: String },
  dbB_dateTimeDeliveredPackage:   { type: String }
});

module.exports = mongoose.model('boxorequest',requestedBoxoMensg);
