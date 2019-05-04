const User = require('../../model/backend/userModel')

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
	
}