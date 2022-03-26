const modelVinos = require('../models/modelVinos');

const controllerVinos = {};

controllerVinos.verVino = async (request, response) => {
  try {
    // console.log(isNaN(request.query.id));
    if (Number.isNaN(request.query.id) || request.query.id === undefined
                                       || request.query.id === null) {
      response.status(500);
      response.render('error', { message: 'El id introducido no es correcto', error: { status: '', stack: '' } });
    } else {
      const [rows] = await modelVinos.find(request.query.id);
      console.log(rows);
      if (rows === undefined) {
        response.status(500);
        response.render('error', { message: 'No existe el vino con ese ID', error: { status: '', stack: '' } });
      } else {
        rows.foto = rows.foto.toString('base64');
        response.render('vino_detalles', { res: null, vino: rows, title: 'Detalles del vino' });
      }
    }
  } catch (e) {
    response.status(500);

    response.render('error', { message: 'Error con la base de datos', error: { status: '', stack: '' } });
  }
};

controllerVinos.agregarVino = async (request, response) => {
  const alert = request.errors;
  if (alert.length > 0) {
    response.render('agregarVino', { alert });
    return;
  }

  const {
    nombre, clase, tipo, gradoAlcohol, bodega, localidad,
  } = request.body;
  const imagen = request.files[0] ? request.files[0].buffer : null;
  try {
    const id = await modelVinos.insert([
      nombre, clase, tipo, gradoAlcohol, bodega, localidad, imagen.buffer,
    ]);
    response.render('agregarVino', { id });
  } catch (e) {
    console.error(e);
    response.status(500);
    response.render('error', { message: 'Error interno de acceso a la base de datos', error: { status: '', stack: '' } });
  }
};

module.exports = controllerVinos;
