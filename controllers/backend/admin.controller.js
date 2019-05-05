const User = require('../../model/backend/userModel')
const Category = require('../../model/backend/categoryModel');
module.exports.admin = (req,res) => {
	res.render('backend/admin');
};

module.exports.viewLogin = (req,res) => {
	res.render('backend/login');
};

module.exports.login = async (req,res) => {
	let password = req.body.password;
	let email = req.body.email;
	let user = await User.find(
		{email:email,password:password});
	
	if(user.length == 1){
		res.cookie('user',user[0].id,{signed:true});
		res.redirect('/admin');
	}else{
		let errors = [];
		errors.push('Email or password wrong!!');
		res.render('backend/login',{
			errors : errors
		})
	}
};

module.exports.logout = (req,res) =>{
	res.clearCookie('user');
	res.redirect('/login');
	
};

module.exports.profile = async (req,res) => {
	let userId = req.signedCookies.user;
	let user = await User.findById(userId);
		
	res.render('backend/profile',{
		user : user
	});	
};

module.exports.viewAddForm = (req,res)=>{
	res.render('backend/add-category')
};

module.exports.add_category = (req,res)=> {
	let name = req.body.name;
	let category = new Category({
		name : name,
		books : []
	});
	category.save().then((data)=>{
		console.log(data)
	}).catch((err)=>{
		console.log(err.message)
	});
	res.redirect('back');
} ;

module.exports.view_category = async (req,res) =>{
	let categories = await Category.find();
	res.render('backend/view_category',{
		categories : categories
	});
};

module.exports.delete_category = (req,res) => {
	let id = req.params.id;
	console.log(id);
	Category.findOneAndRemove({_id : id}).then(()=>{
		console.log("deleted")
	})
	res.redirect('back');
};