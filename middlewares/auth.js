const User = require('../model/backend/userModel');
module.exports = async (req,res,next) => {
	let userId = req.signedCookies.user;
	let user = await User.findById(userId);
	if(user){
		res.locals.user = user;
		next();
	}else{
		res.redirect('/login')
	}
}