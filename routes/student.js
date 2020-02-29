const express = require('express');

const studentController = require('../controller/student');

const router = express.Router();

router.get('/login', studentController.getLogin);

router.get('/dashboard', studentController.getDashboard);

module.exports = router;