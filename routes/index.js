const express = require('express');

const indexController = require('../controller/index');

const API = require('../api/v1/index');

const router = express.Router();

router.get('/scanner', indexController.getScanner);

router.get('/paslonData', API.getPaslonData);

router.post('/invert_status', API.postInvertStatus);

router.post('/registerToken', API.registerToken);

module.exports = router;