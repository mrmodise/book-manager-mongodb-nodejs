var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// creating the book schema with 3 properties
var BookSchema = new Schema({
	title: String,
	author: String,
	category: String
});

// export our model to use in other files
module.exports = mongoose.model('Book', BookSchema);