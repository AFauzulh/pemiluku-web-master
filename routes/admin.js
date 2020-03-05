const express = require('express');

const adminController = require('../controller/admin');

const router = express.Router();

router.get('/login', adminController.getLoginAdmin);
router.get('/dashboard', adminController.getAdminDashboard);
router.get('/postLogoutAdmin', adminController.postLogoutAdmin);
router.get('/chart', adminController.getGrafik);


router.post('/postLoginAdmin', adminController.postLoginAdmin);
router.post('/postLogoutAdmin', adminController.postLogoutAdmin);


module.exports = router;