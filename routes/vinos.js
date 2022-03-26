const express = require('express');
const cVinos = require('../controllers/controllerVinos');
const vinoSchema = require('../validators/vino.validator');
const validate = require('../middlewares/schemaValidator');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('jjsaasjasj que pro soy mira');
});

router.get('/agregarVino', (req, res) => {
  res.render('agregarVino');
});

router.get('/mostrarVino', cVinos.verVino);
router.post('/agregarVino', validate(vinoSchema), cVinos.agregarVino);

module.exports = router;
