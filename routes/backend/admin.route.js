const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/backend/admin.controller');


router.get('/',controllers.admin);

router.get('/profile',controllers.profile);

router.get('/add-category',controllers.viewAddForm);

router.post('/add-category',controllers.add_category);

router.get('/view-category',controllers.view_category);

router.get('/delete-category/:id',controllers.delete_category);

router.get('/add-post',controllers.viewAddPostForm);

router.post('/add-post',controllers.add_post);

router.get('/view-post',controllers.view_post);

router.get('/delete-post/:p_id/:c_id',controllers.deletePost);


module.exports = router;