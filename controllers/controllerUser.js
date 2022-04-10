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
        response.render('login', { errors: ['Usuario o contraseña incorrectas'] });
      }
    } else {
      response.render('login', { errors: ['Usuario o contraseña incorrectas'] });
    }
  } catch (e) {
    console.error(e);
    response.status(500);
    e.message = 'Error interno de acceso a la base de datos';
    next(e);
  }
};

module.exports = controllerUser;
