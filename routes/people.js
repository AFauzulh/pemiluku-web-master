const express = require('express');

const peopleController = require('../controller/people');

const router = express.Router();

router.get('/login', peopleController.getLogin);

router.get('/dashboard', peopleController.getDashboard);

module.exports = router;