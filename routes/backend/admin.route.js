const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/backend/admin.controller');


router.get('/',controllers.admin);









module.exports = router;