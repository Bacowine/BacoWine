const express = require('express');
const multer = require('multer');

const upload = multer();
const controllerBodega = require('../controllers/controllerBodega');
const bodegaSchema = require('../validators/bodega.validator');
const validate = require('../middlewares/schemaValidator');

const router = express.Router();

router.get('/', (_req, res) => res.redirect('/bodega/agregarBodega'));
router.get('/detalles', controllerBodega.mostrarDetallesBodega);
router.get('/agregarBodega', (_req, res) => res.render('agregarBodega'));
router.post('/agregarBodega', upload.single('imagen'), validate(bodegaSchema), controllerBodega.insertarBodega);
router.post('/borrarBodega', controllerBodega.borrarBodega);

module.exports = router;
