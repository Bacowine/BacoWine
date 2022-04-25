// const fs = require('fs');
const modelVino = require('../models/modelVino');

const controllerVino = {};

controllerVino.verVino = async (request, response, next) => {
  const { id } = request.query;
  const { user } = request.session;

  if (Number.isNaN(Number(id)) || Number.isNaN(Number.parseInt(id, 10))) {
    response.status(500);
    next(new Error('El id tiene que ser un número válido'));
  } else {
    try {
      const [rows, variedades] = await modelVino.find(id);
      if (rows === undefined || variedades === undefined) {
        response.status(500);
        next(new Error('No existe el vino con ese ID'));
      } else {
        rows.foto = rows.foto ? rows.foto.toString('base64') : null;
        rows.comentarios = await modelVino.buscarComentariosVino(id);
        rows.valoraciones = await modelVino.buscarValoracionesVino(id);
        if (user !== undefined && user.role !== 'GC') {
          rows.valoracion = await modelVino.confirmarValoracionVino(id, user.name);
        } else { rows.valoracion = 0; }
        if (rows.comentarios === undefined) rows.comentarios = [];
        rows.variedades = variedades.map((item) => (item.porcentaje === 0 ? item.nombre_variedad : `${item.porcentaje}% ${item.nombre_variedad}`), '').join(', ');

        const vino = {
          id: rows.id,
          nombre: rows.nombre,
          añada: rows.anyada,
          clase: rows.clase,
          tipo: rows.tipo,
          maceración: rows.maceracion,
          graduación: rows.graduacion+"% vol.",
          bodega: rows.bodega,
          localidades: rows.localidades,
          foto: rows.foto,
          activo: rows.activo,
          variedades: rows.variedades,
          comentarios: rows.comentarios,
          valoraciones: rows.valoraciones,
          valoracion: rows.valoracion,
        };
        response.render('vino_detalles', {
          res: null, vino, title: 'Detalles del vino',
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
    nombre, anyada, clase, maceracion, variedad, graduacion, bodega, localidades,
  } = request.body;

  const alert = request.errors;
  if (alert.length > 0) { // >0
    const imagen = request.file ? request.file.buffer.toString('base64') : null;
    response.render('agregarVino', {
      alert,
      body: {
        nombre, anyada, clase, maceracion, graduacion, bodega, localidades, imagen, variedad,
      },
    });
    return;
  }

  try {
    // const imagen = (request.file)
    // ? request.file.buffer : fs.readFileSync(`${__dirname}/../public/images/vino.jpg`);
    const imagen = (request.file) ? request.file.buffer : null;
    console.log(variedad);

    const id = await modelVino.insert([
      nombre, anyada, clase, maceracion, graduacion, bodega, localidades, imagen,
    ], JSON.parse(variedad));

    // response.render('agregarVino', { id });
    response.redirect(`/vino/detalles?id=${id}`);
  } catch (e) {
    console.error(e);
    response.status(500);
    e.message = 'Error interno de acceso a la base de datos';
    next(e);
  }
};

controllerVino.modificarVino = async (request, response, next) => {
  const { id } = request.query;
  const { url } = request;

  try {
    const [rows, variedades] = await modelVino.find(id);
    const edit = url.includes('/modificarVino');
    if (rows === undefined || variedades === undefined) {
      response.render('agregarVino', {
        body: {
          edit,
          variedad: '{}',
        },
      });
    } else {
      rows.foto = rows.foto ? rows.foto.toString('base64') : null;
      rows.variedad = JSON.stringify(variedades.reduce((obj, item) => {
        obj[item.nombre_variedad] = item.porcentaje;
        return obj;
      }, {}));
      response.render('agregarVino', {
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

controllerVino.modificarVinoFinal = async (request, response, next) => {
  const {
    nombre, anyada, clase, variedad, maceracion, graduacion, bodega, localidades, id,
  } = request.body;
  try {
    // const imagen = (request.file)
    // ? request.file.buffer : fs.readFileSync(`${__dirname}/../public/images/vino.jpg`);
    const update = {
      nombre, anyada, clase, maceracion, graduacion, bodega, localidades, id,
    };
    if (request.file) {
      update.foto = request.file.buffer;
    }

    await modelVino.update(update, JSON.parse(variedad));

    response.redirect(`/vino/detalles?id=${id}`);
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

controllerVino.borrarComentario = async (request, response, next) => {
  const { idVino, idComentario } = request.body;

  const { user } = request.session;

  try {
    const [comentario] = await modelVino.buscarComentario([idComentario]);
    if (comentario.user !== user.name && user.role !== 'GC') {
      const e = new Error('Forbidden');
      e.status = 403;
      next(e);
    } else {
      await modelVino.borrarComentario([idComentario]);
      response.redirect(`/vino/detalles?id=${idVino}#inputComentario`);
    }
  } catch (e) {
    console.error(e);
    response.status(500);
    e.message = 'Error interno de acceso a la base de datos';
    next(e);
  }
};

controllerVino.valorarVino = async (request, response, next) => {
  const {
    idVino, valoracion,
  } = request.body;

  const { user } = request.session;
  try {
    if (user === undefined || user.role === 'GC') {
      const e = new Error('Forbidden');
      e.status = 403;
      response.status(403);
      next(e);
    } else {
      const existe = await modelVino.confirmarValoracionVino(idVino, user.name);
      if (existe === 0) {
        await modelVino.valorarVino(idVino, user.name, valoracion);
      } else {
        await modelVino.modificarvalorarVino(idVino, user.name, valoracion);
      }
      response.redirect(`/vino/detalles?id=${idVino}#valorar`);
    }
  } catch (e) {
    console.error(e);
    response.status(500);
    e.message = 'Error interno de acceso a la base de datos';
    next(e);
  }
};

controllerVino.getClasesVino = async (_req, res, next) => {
  try {
    const clases = await modelVino.readClasesVino();
    console.log(clases);
    res.json(clases);
  } catch (e) {
    console.error(e);
    res.status(500);
    e.message = 'Error interno de acceso a la base de datos';
    next(e);
  }
};

controllerVino.mostrarVinos = async (req, res, after) => {
  const search = req.query.search || '';
  const page = +req.query.page - 1 || 0;
  const size = 9;

  const limit = size < 0 ? 1 : size;
  const offset = page < 0 ? 0 : page * size;

  try {
    const { vinos, count } = await modelVino.readAll({ search, limit, offset });

    const current = page + 1;
    const pages = Math.ceil(count / size);
    const next = current + 1 > pages ? pages : current + 1;
    const prev = current - 1 < 0 ? 0 : current - 1;
    const pagination = {
      current, next, prev, pages,
    };

    res.render('vinos', { vinos, pagination, search });
  } catch (e) {
    console.error(e);
    res.status(500);
    const err = new Error('Error interno de acceso a la base de datos');
    err.stack = e.stack;
    after(err);
  }
};

module.exports = controllerVino;
