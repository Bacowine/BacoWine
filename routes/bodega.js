const express = require('express');
const controllerBodega = require('../controllers/controllerBodega');
const bodegaSchema = require('../validators/bodega.validator');
const validate = require('../middlewares/schemaValidator');

const router = express.Router();

router.get('/', (_req, res) => res.redirect('/bodega/agregarBodega'));
router.get('/detalles', controllerBodega.mostrarDetallesBodega);
router.get('/agregarBodega', (_req, res) => res.render('agregarBodega'));
router.post('/agregarBodega', validate(bodegaSchema), controllerBodega.insertarBodega);

module.exports = router;
