var express = require('express');
var router = express.Router();

//BORRAR DESPUES DE HACER MODELO Y CONTROLLER
const modelBodega = require('../models/modelBodega.js');
const bod = new modelBodega();
//<--

router.get('/', function(req, res, next) {
  res.send("VISTA PRINCIPAL");
});

router.get('/detalles', function(req, res, next) {
  if (req.query.id) {
    //EJEMPLO DE MODELO
    const bodega = {
      foto:bod.getFoto(),
      nombre:"UCMVinos",
      anyo:"1940",
      localizacion:"Madrid",
      descripcion:`En la Comunidad hay 12.000 hectáreas dedicadas al cultivo de uva de vino, 8.900 con la D.O. (denominación de origen) Vinos de Madrid, un 78% de la superficie vitivinícola.\n\nLa D.O. Vinos de Madrid fue creada en 1990 y es una de las 94 denominaciones de origen reconocidas en España. Está formada por cuatro subzonas: Arganda, Navalcarnero, San Martín de Valdeiglesias y El Molar -esta última desde febrero de 2019.\n\nExporta ya más de 5.000 hectolitros de vino, el 30% de su producción, a países dentro de la Unión Europea, Estados Unidos o China, demostrando una gran capacidad para competir en los mercados internacionales, gracias al trabajo del sector vitivinícola de la región.`,
      origen:"Rioja"
    };

    res.render('bodega_detalles', { title: 'BacoWine DEV', id: req.query.id, bodega });
  }else{
    res.send('Id de bodega no valido');
  }
});

module.exports = router;
