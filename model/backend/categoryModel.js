const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
	title : String,
	image : String,
	author : String,
	category : String
});

const categorySchema = new mongoose.Schema({
	name : String,
	posts : [postSchema]
});

const Category = mongoose.model("Category",categorySchema);

module.exports = Category;