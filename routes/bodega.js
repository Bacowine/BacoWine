const express = require('express');
const controllerBodega = require('../controllers/controllerBodega');

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('VISTA PRINCIPAL');
});

router.get('/agregarBodega', (_req, res) => {
  res.render('agregarBodega', { title: 'BacoWine DEV' });
});
router.post('/agregarBodega', controllerBodega.insertarBodega);
router.get('/detalles', controllerBodega.mostrarDetallesBodega);

module.exports = router;
