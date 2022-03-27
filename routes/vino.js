const express = require('express');
const cVinos = require('../controllers/controllerVino');
const vinoSchema = require('../validators/vino.validator');
const validate = require('../middlewares/schemaValidator');

const router = express.Router();

router.get('/', (_req, res) => res.redirect('/vino/agregarVino'));

router.get('/detalles', cVinos.verVino);

router.get('/agregarVino', (_req, res) => res.render('agregarVino'));
router.post('/agregarVino', validate(vinoSchema), cVinos.agregarVino);

module.exports = router;