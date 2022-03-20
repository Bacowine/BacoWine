const express = require('express');
const cVinos = require('../controllers/controllerVinos');

const router = express.Router();

router.post('/mostrarVino', cVinos.verVinos);

module.exports = router;
