const express = require('express');
const cVinos = require('../controllers/controllerVinos');
const vinoSchema = require('../validators/vino.validator');
const validate = require('../middlewares/schemaValidator');

const router = express.Router();

router.get('/', (_req, res) => {
  res.redirect('agregarVino');
});

router.get('/agregarVino', (_req, res) => {
  res.render('agregarVino');
});

router.get('/mostrarVino', cVinos.verVino);
router.post('/agregarVino', validate(vinoSchema), cVinos.agregarVino);

module.exports = router;
