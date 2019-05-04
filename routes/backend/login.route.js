const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/backend/admin.controller');

router.get('/login',controllers.viewLogin);

router.post('/login',controllers.login);

router.get('/logout',controllers.logout);

module.exports = router;