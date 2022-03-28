const modelBodega = require('../models/modelBodega');

const controllerBodega = {};

controllerBodega.mostrarDetallesBodega = async (request, response, next) => {
  const { id } = request.query;

  if (Number.isNaN(Number(id)) || Number.isNaN(Number.parseInt(id, 10))) {
    response.status(500);
    next(new Error('El id tiene que ser un número válido'));
  } else {
    try {
      const [row] = await modelBodega.find(id);
      if (row !== undefined) {
        const bodega = {
          foto: row.foto.toString('base64'),
          nombre: row.nombre,
          anyo: row.anyoCreacion,
          localizacion: row.localizGeo,
          descripcion: row.descripcion,
          origen: row.denominOrigen,
        };
        response.render('bodega_detalles', { title: 'BacoWine DEV', id, bodega });
      } else {
        response.status(500);
        next(new Error('No existe la bodega con ese ID'));
      }
    } catch (e) {
      console.error(e);
      response.status(500);
      e.message = 'Error interno de acceso a la base de datos';
      next(e);
    }
  }
};

controllerBodega.insertarBodega = async (request, response, next) => {
  const alert = request.errors;
  if (alert.length > 0) {
    response.render('agregarBodega', { alert });
    return;
  }

  const {
    nombre, anyoCreacion, localizGeo, descripcion, denominOrigen,
  } = request.body;
  const imagen = (request.file) ? request.file.buffer : null;
  try {
    const id = await modelBodega.add([
      nombre, anyoCreacion, localizGeo, descripcion, denominOrigen, imagen,
    ]);
    response.render('agregarBodega', { id });
  } catch (e) {
    console.error(e);
    response.status(500);
    const err = new Error('Error interno de acceso a la base de datos');
    err.stack = e.stack;
    next(err);
  }
};

controllerBodega.borrarBodega = async (request, response, next) => {
  
  const { id } = request.query;
  if (Number.isNaN(Number(id)) || Number.isNaN(Number.parseInt(id, 10))) {
    response.status(500);
    next(new Error('El id tiene que ser un número válido'));
  }else{
    try {
      const [rows] = await modelBodega.findID(id);
      if (rows === undefined) {
        response.status(500);
        next(new Error('No existe el vino con ese ID'));
      } else { 
        await modelBodega.borrarBodega(id);
        response.redirect('/');
      }
    } catch (e) {
      console.error(e);
      response.status(500);
      const err = new Error('Error interno de acceso a la base de datos');
      err.stack = e.stack;
      next(err);
    }
  }
};

module.exports = controllerBodega;
