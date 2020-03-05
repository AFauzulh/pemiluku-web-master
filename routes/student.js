const express = require('express');

const studentController = require('../controller/student');

const router = express.Router();

router.get('/login', studentController.getLogin);
router.get('/dashboard', studentController.getDashboard);
router.get('/pilih', studentController.getPilih);
router.get('/postLogoutStudent', studentController.postLogoutStudent);

router.post('/pilih', studentController.postPilihan);
router.post('/postLogin', studentController.postLogin);
router.post('/postLogout', studentController.postLogout);

module.exports = router;