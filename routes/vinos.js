const express = require('express');
const cVinos = require('../controllers/controllerVinos');

const router = express.Router();

router.get('/mostrarVino', cVinos.verVino);

module.exports = router;
