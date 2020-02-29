const express = require('express');

const peopleController = require('../controller/people');

const router = express.Router();

router.get('/people/login', peopleController.getLogin);

module.exports = router;