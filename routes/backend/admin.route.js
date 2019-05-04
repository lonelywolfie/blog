const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/backend/admin.controller');


router.get('/',controllers.admin);

router.get('/profile',controllers.profile);









module.exports = router;