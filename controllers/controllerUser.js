// const fs = require('fs');
const bcrypt = require('bcrypt');

const modelUser = require('../models/modelUser');

const controllerUser = {};

controllerUser.login = async (request, response, next) => {
  const { user, password, remember } = request.body;
  console.log(request.body);
  try {
    const [row] = await modelUser.read(user);
    console.log(row);

    if (row !== undefined && row.password) {
      const validPassword = await bcrypt.compare(password, row.password);

      if (validPassword) {
        if (remember) {
          request.session.cookie.maxAge = 1 * 24 * 60 * 60 * 1000; // Cookie expires after 1 day
        } else {
          request.session.cookie.expires = false; // Cookie expires at end of session
        }
        request.session.user = { name: row.user, role: row.role };
        response.redirect('/');
      } else {
        response.status(400);
        response.render('login', { errors: ['Usuario o contraseña incorrectas'] });
      }
    } else {
      response.status(400);
      response.render('login', { errors: ['Usuario o contraseña incorrectas'] });
    }
  } catch (e) {
    console.error(e);
    response.status(500);
    e.message = 'Error interno de acceso a la base de datos';
    next(e);
  }
};
controllerUser.signup = async (request, response, next) => {
  const { user, password } = request.body;
  console.log(request.body);
  try {
    const hash = await bcrypt.hash(password, 10);
    const [userRead] = await modelUser.read(user);

    if (userRead === undefined) { // El usuario no existo
      const insertedId = await modelUser.create([user, hash, 'UR']); // Lo insertamos
      request.session.cookie.maxAge = 1 * 24 * 60 * 60 * 1000; // Cookie expires after 1 day
      request.session.user = { name: user, role: 'UR' };
      response.redirect('/');
    } else {
      response.status(400);
      response.render('signup', { errors: ['Usuario ya existente.'] });
    }
  } catch (e) {
    console.error(e);
    response.status(500);
    e.message = 'Error interno de acceso a la base de datos';
    next(e);
  }
};

controllerUser.logout = async (request, response, next) => {
  request.session.destroy(() => {
    response.clearCookie('connect.sid');
    response.redirect('/');
  });
};

module.exports = controllerUser;
