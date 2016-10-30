var mongoose = require('mongoose'),

//User collection
appInfoContactUs = new mongoose.Schema({
  dbB_name:           { type: String },
  dbB_email:          { type: String },
  dbB_comments:       { type: String },
  dbB_dateTime:	      { type: String }
});

module.exports = mongoose.model('appcontactus',appInfoContactUs);
