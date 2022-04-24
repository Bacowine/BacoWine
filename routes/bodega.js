const express = require('express');

const { upload, imageHandler } = require('../middlewares/upload');
const controllerBodega = require('../controllers/controllerBodega');
const bodegaSchema = require('../validators/bodega.validator');
const validate = require('../middlewares/schemaValidator');

const { ROLE, authRole } = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .get(controllerBodega.mostrarBodegas);

router.route('/detalles')
  .get(controllerBodega.mostrarDetallesBodega);

router.route('/agregarBodega')
  .get(authRole(ROLE.ADMIN), (_req, res) => res.render('agregarBodega'))
  .post(authRole(ROLE.ADMIN), upload.single('imagen'), imageHandler, validate(bodegaSchema), controllerBodega.insertarBodega);

router.route('/borrarBodega')
  .post(authRole(ROLE.ADMIN), controllerBodega.borrarBodega);

router.route('/modificarBodega')
  .get(authRole(ROLE.ADMIN), controllerBodega.modificarBodega)
  .post(authRole(ROLE.ADMIN), upload.single('imagen'), imageHandler, validate(bodegaSchema), controllerBodega.modificarBodegaFinal);

module.exports = router;
