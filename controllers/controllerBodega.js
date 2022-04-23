// const fs = require('fs');
const modelBodega = require('../models/modelBodega');

const controllerBodega = {};

controllerBodega.mostrarBodegas = async (req, res, after) => {
  const search = req.query.search || '';
  const page = +req.query.page - 1 || 0;
  const size = 9;

  const limit = size < 0 ? 1 : size;
  const offset = page < 0 ? 0 : page * size;

  try {
    const { bodegas, count } = await modelBodega.readAll({ search, limit, offset });

    const current = page + 1;
    const pages = Math.ceil(count / size);
    const next = current + 1 > pages ? pages : current + 1;
    const prev = current - 1 < 0 ? 0 : current - 1;
    const pagination = {
      current, next, prev, pages,
    };

    res.render('bodegas', { bodegas, pagination, search });
  } catch (e) {
    console.error(e);
    res.status(500);
    const err = new Error('Error interno de acceso a la base de datos');
    err.stack = e.stack;
    after(err);
  }
};

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
          foto: row.foto ? row.foto.toString('base64') : null,
          nombre: row.nombre,
          anyo: row.anyoCreacion,
          localizacion: row.localizGeo,
          descripcion: row.descripcion,
          origen: row.denominOrigen,
          id,
        };
        response.render('bodega_detalles', { title: 'BacoWine DEV', bodega });
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
  const {
    nombre, anyoCreacion, localizGeo, descripcion, denominOrigen,
  } = request.body;
  const alert = request.errors;
  if (alert.length > 0) {
    const foto = request.file ? request.file.buffer.toString('base64') : null;
    response.render('agregarBodega', {
      alert,
      body: {
        nombre, anyoCreacion, localizGeo, descripcion, denominOrigen, foto,
      },
    });
    return;
  }

  try {
    // const imagen = (request.file)
    // ? request.file.buffer : fs.readFileSync(`${__dirname}/../public/images/bodega.jpg`);
    const imagen = (request.file) ? request.file.buffer : null;
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

controllerBodega.modificarBodega = async (request, response, next) => {
  const { id } = request.query;
  const { url } = request;

  try {
    const [rows] = await modelBodega.find(id);
    const edit = url.includes('/modificarBodega');
    if (rows === undefined) {
      response.render('agregarBodega', {
        body: {
          edit,
          variedad: '{}',
        },
      });
    } else {
      rows.foto = rows.foto ? rows.foto.toString('base64') : null;
      response.render('agregarBodega', {
        body: {
          ...rows,
          edit,
        },
      });
    }
  } catch (e) {
    console.error(e);
    response.status(500);
    e.message = 'Error interno de acceso a la base de datos';
    next(e);
  }
};

controllerBodega.modificarBodegaFinal = async (request, response, next) => {
  const {
    nombre, anyoCreacion, localizGeo, descripcion, denominOrigen, id,
  } = request.body;
  try {
    // const imagen = (request.file)
    // ? request.file.buffer : fs.readFileSync(`${__dirname}/../public/images/vino.jpg`);
    const update = {
      nombre, anyoCreacion, localizGeo, descripcion, denominOrigen, id,
    };
    if (request.file) {
      update.foto = request.file.buffer;
    }

    await modelBodega.update(update);

    response.redirect(`/bodega/detalles?id=${id}`);
  } catch (e) {
    console.error(e);
    response.status(500);
    e.message = 'Error interno de acceso a la base de datos';
    next(e);
  }
};

controllerBodega.borrarBodega = async (request, response, next) => {
  const { id } = request.body;
  if (Number.isNaN(Number(id)) || Number.isNaN(Number.parseInt(id, 10))) {
    response.status(500);
    next(new Error('El id tiene que ser un número válido'));
  } else {
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
