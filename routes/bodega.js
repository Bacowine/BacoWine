var express = require('express');
const controllerBodega = require('../controllers/controllerBodega.js');
var router = express.Router();

//BORRAR DESPUES DE HACER MODELO Y CONTROLLER
const modelBodega = require('../models/modelBodega.js');
const bod = new modelBodega();
const CBodega = new controllerBodega();
//<--

router.get('/', function(req, res, next) {
  res.send("VISTA PRINCIPAL");
});

router.get('/detalles', CBodega.mostrarDetallesBodega);

module.exports = router;
