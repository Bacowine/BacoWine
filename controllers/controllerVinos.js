const modelVinos = require('../models/modelVinos');

const controllerVinos = {};

controllerVinos.verVino = async (request, response, next) => {
  try {
    // console.log(isNaN(request.query.id));
    if (Number.isNaN(request.query.id) || request.query.id === undefined
                                       || request.query.id === null) {
      response.status(500);
      next(new Error('El id introducido no es correcto'));
    } else {
      const [rows] = await modelVinos.find(request.query.id);
      console.log(rows);
      if (rows === undefined) {
        response.status(500);
        next(new Error('No existe el vino con ese ID'));
      } else {
        rows.foto = rows.foto.toString('base64');
        response.render('vino_detalles', { res: null, vino: rows, title: 'Detalles del vino' });
      }
    }
  } catch (e) {
    console.error(e);
    response.status(500);
    const err = new Error('Error interno de acceso a la base de datos');
    err.stack = e.stack;
    next(err);
  }
};

module.exports = controllerVinos;
