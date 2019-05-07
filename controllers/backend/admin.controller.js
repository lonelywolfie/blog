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

module.exports.viewAddPostForm = async (req,res) => {
	let categories = await Category.find()
	res.render('backend/add-post',{
		categories : categories
	});
};

module.exports.add_post = (req,res) => {
	let path = 'images/' + req.file.originalname;
	let id = req.body.category_id;
	req.body.avatar = path;
	Category.findOne({_id : id}).then((record)=>{
		req.body.category_name = record.name;
		req.body.category_id = record._id;
		record.posts.push(req.body);
		record.save().then(()=>{
			res.redirect('back');
		}).catch((err)=>{
			res.send(err.message);
		});
	});

};

module.exports.view_post = (req,res) => {
	Category.find().then((data)=>{
	let posts = data.reduce((x,item)=>{
	 	return x.concat(item.posts);	
		},[]);
	res.render('backend/view-users',{
			posts : posts
		});
	});
};

module.exports.deletePost = (req,res) => {
    let post_id = req.params.p_id;
    let category_id = req.params.c_id;
    Category.findById(category_id).then((result)=>{
        let indexOfPost = result.posts.findIndex((element)=>{
            return element._id == post_id;
        });
        result.posts.splice(indexOfPost,1);
        result.save();
        res.redirect('back');
    });
};

