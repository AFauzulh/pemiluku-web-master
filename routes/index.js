const express = require('express');

const indexController = require('../controller/index');
const API = require('../api/v1/index');

const router = express.Router();

router.get('/scanner', indexController.getScanner);

router.post('/invert_status', API.postInvertStatus);

router.post('/registerTps', API.registerToTps);

module.exports = router;