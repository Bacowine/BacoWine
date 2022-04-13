// const fs = require('fs');
const modelVino = require('../models/modelVino');

const controllerVino = {};

controllerVino.verVino = async (request, response, next) => {
  const { id } = request.query;

  if (Number.isNaN(Number(id)) || Number.isNaN(Number.parseInt(id, 10))) {
    response.status(500);
    next(new Error('El id tiene que ser un número válido'));
  } else {
    try {
      const [rows, variedades] = await modelVino.find(request.query.id);
      if (rows === undefined || variedades === undefined) {
        response.status(500);
        next(new Error('No existe el vino con ese ID'));
      } else {
        rows.foto = rows.foto ? rows.foto.toString('base64') : null;
        rows.comentarios = await modelVino.buscarComentariosVino(id);
        if (rows.comentarios === undefined) rows.comentarios = [];
        response.render('vino_detalles', {
          res: null, vino: rows, variedades, title: 'Detalles del vino',
        });
      }
    } catch (e) {
      console.error(e);
      response.status(500);
      e.message = 'Error interno de acceso a la base de datos';
      next(e);
    }
  }
};

controllerVino.agregarVino = async (request, response, next) => {
  const {
    nombre, clase, tipo, maceracion, variedad, gradoAlcohol, bodega, localidad,
  } = request.body;

  const alert = request.errors;
  if (alert.length > 0) { // >0
    const imagen = request.file;
    response.render('agregarVino', {
      alert,
      body: {
        nombre, clase, tipo, maceracion, variedad, gradoAlcohol, bodega, localidad, imagen,
      },
    });
    return;
  }

  try {
    // const imagen = (request.file)
    // ? request.file.buffer : fs.readFileSync(`${__dirname}/../public/images/vino.jpg`);
    const imagen = (request.file) ? request.file.buffer : null;

    const id = await modelVino.insert([
      nombre, clase, tipo, maceracion, gradoAlcohol, bodega, localidad, imagen,
    ], JSON.parse(variedad));

    response.render('agregarVino', { id });
  } catch (e) {
    console.error(e);
    response.status(500);
    e.message = 'Error interno de acceso a la base de datos';
    next(e);
  }
};

controllerVino.borrarVino = async (request, response, next) => {
  const { id } = request.body;
  if (Number.isNaN(Number(id)) || Number.isNaN(Number.parseInt(id, 10))) {
    response.status(500);
    next(new Error('El id tiene que ser un número válido'));
  } else {
    try {
      const [rows] = await modelVino.findID(id);
      console.log(rows);
      if (rows === undefined) {
        response.status(500);
        next(new Error('No existe el vino con ese ID'));
      } else {
        await modelVino.borrarVino(id);
        response.redirect('/');
      }
    } catch (e) {
      console.error(e);
      response.status(500);
      e.message = 'Error interno de acceso a la base de datos';
      next(e);
    }
  }
};

controllerVino.comentarVino = async (request, response, next) => {
  const {
    idVino, texto,
  } = request.body;

  const { user } = request.session;

  try {
    if (user === undefined || user.role === 'GC') {
      const e = new Error('Forbidden');
      e.status = 403;
      response.status(403);
      next(e);
    } else {
      const id = await modelVino.comentarVino([
        user.name, idVino, texto,
      ]);
      response.redirect(`/vino/detalles?id=${idVino}#${id}`);
    }
  } catch (e) {
    console.error(e);
    response.status(500);
    e.message = 'Error interno de acceso a la base de datos';
    next(e);
  }
};

module.exports = controllerVino;
