const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
	title : String,
	avatar : String,
	author : String,
	category_name : String,
	category_id : String,
	content : String
});

const categorySchema = new mongoose.Schema({
	name : String,
	posts : [postSchema]
});

const Category = mongoose.model("Category",categorySchema);

module.exports = Category;