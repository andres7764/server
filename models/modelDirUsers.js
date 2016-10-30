var mongoose = require('mongoose'),

//Dirs collection
appDirs = new mongoose.Schema({
  dbB_usuario:   { type: String },
  dbB_dirName:   { type: String },
  dbB_lat:       { type: String },
  dbB_lng:       { type: String },
  dbB_tipo:      { type: String }
});

module.exports = mongoose.model('appDirs',appDirs);