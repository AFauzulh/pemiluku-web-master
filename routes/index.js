const express = require('express');

const indexController = require('../controller/index');

const router = express.Router();

router.get('/', indexController.getIndex);

router.get('/scanner', indexController.getScanner);

router.post('/invert_status', indexController.postInvertStatus);

router.post('/registerTps', indexController.registerToTps);


module.exports = router;