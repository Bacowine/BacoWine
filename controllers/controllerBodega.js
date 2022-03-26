const modelBodega = require('../models/modelBodega');

const controllerBodega = {};

controllerBodega.mostrarDetallesBodega = async (request, response) => {
  const { id } = request.query;

  if (id === undefined || id == null) {
    response.status(500);
    response.render('error', { message: 'El id no puede estar vacío', error: { status: '', stack: '' } });
  } else if (Number.isNaN(id)) {
    response.status(500);
    response.render('error', { message: 'El id tiene que ser un número', error: { status: '', stack: '' } });
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
        response.render('error', { message: 'No existe la bodega con ese ID', error: { status: '', stack: '' } });
      }
    } catch (e) {
      console.error(e);
      response.status(500);
      response.render('error', { message: 'Error interno de acceso a la base de datos', error: { status: '', stack: '' } });
    }
  }
};

module.exports = controllerBodega;
