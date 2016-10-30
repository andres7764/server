var mongoose = require('mongoose'),

//User collection
BoxoUsers = new mongoose.Schema({
  dbB_nameUsr:        { type: String },
  dbB_ltNameUsr:      { type: String },
  dbB_dateBorn :      { type: String },
  dbB_nickname:       { type: String },
  dbB_password:       { type: String },
  dbB_cities:         { type: String },
  dbB_locationSaved:  { type: String },
  dbB_typeRol:        { type: String },
  dbB_email:          { type: String },
  dbB_fechaRegistro:  { type: String },
  dbB_photo:          { type: String },
  dbB_tokenDevice:    { type: String },
  dbB_routeRecibo:    { type: String },
  dbB_routeCedula:    { type: String },
  dbB_routeform:      { type: String },
  dbB_routeArl:       { type: String },
  dbB_routeEps:       { type: String }

});


module.exports = mongoose.model('boxousers',BoxoUsers);
