const modelVinos = require('../models/modelVinos');

const controllerVinos = {};

controllerVinos.verVinos = async (request, response) => {
  try {
    const [rows] = await modelVinos.find(request.body.id);
    // console.log(rows);
    response.render('mostrarVino', { res: null, vino: rows });
  } catch (e) {
    response.status(500);
    response.render('error', { message: 'Error interno de acceso a la base de datos' });
  }
};

module.exports = controllerVinos;
