const express = require('express');
const multer = require('multer');

const upload = multer();
const controllerBodega = require('../controllers/controllerBodega');
const bodegaSchema = require('../validators/bodega.validator');
const validate = require('../middlewares/schemaValidator');

const { ROLE, authRole } = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .get((_req, res) => res.redirect('/bodega/agregarBodega'));

router.route('/detalles')
  .get(controllerBodega.mostrarDetallesBodega);

router.route('/agregarBodega')
  .get(authRole(ROLE.ADMIN), (_req, res) => res.render('agregarBodega'))
  .post(authRole(ROLE.ADMIN), upload.single('imagen'), validate(bodegaSchema), controllerBodega.insertarBodega);

router.route('/borrarBodega')
  .post(authRole(ROLE.ADMIN), controllerBodega.borrarBodega);

module.exports = router;
