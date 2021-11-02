const express = require('express');

const UserCtrl = require('./controller');

const router = express.Router();

router.get('/getStats', UserCtrl.getStats);

module.exports = router;