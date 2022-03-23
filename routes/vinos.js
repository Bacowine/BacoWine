const express = require('express');
const cVinos = require('../controllers/controllerVinos');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('jjsaasjasj que pro soy mira');
});

router.get('/agregarVino', (req, res) => {
  res.render('agregarVino');
});

router.get('/mostrarVino', cVinos.verVino);

module.exports = router;
