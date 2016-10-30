var mongoose = require("mongoose"),

cancelForm = new mongoose.Schema({
	dbB_optionSelected: { type: String },
	dbB_comments: 		{ type: String },
	dbB_dateTime: 		{ type: String },
	dbB_sendId: 		{ type: String }
})

module.exports = mongoose.model('cancelform', cancelForm);