const express = require('express');
const controllerBodega = require('../controllers/controllerBodega');

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('VISTA PRINCIPAL');
});

router.get('/detalles', controllerBodega.mostrarDetallesBodega);

module.exports = router;
