const { checkSchema } = require('express-validator');

const bodegaSchema = checkSchema({
  nombre: {
    notEmpty: true,
    errorMessage: 'Nombre no puede estar vacio',
    isLength: {
      options: { min: 1, max: 50 },
      errorMessage: 'Nombre debe tener entre 1 y 50 caracteres',
    },
  },
  anyoCreacion: {
    isInt: {
      options: { gt: 1800, lt: new Date().getFullYear() },
      errorMessage: 'Añada debe estar entre 1800 y el año actual',
    },
  },
  localizGeo: {
    notEmpty: true,
    errorMessage: 'Localizacion no puede estar vacio',
    isLength: {
      options: { min: 1, max: 50 },
      errorMessage: 'Localizacion debe tener entre 1 y 50 caracteres',
    },
  },
  descripcion: {
    notEmpty: true,
    errorMessage: 'Descripcion no puede estar vacio',
    isLength: {
      options: { min: 1, max: 500 },
      errorMessage: 'Descripcion debe tener entre 1 y 500 caracteres',
    },
  },
  denominOrigen: {
    notEmpty: true,
    errorMessage: 'Denominacion de origen no puede estar vacio',
    isLength: {
      options: { min: 1, max: 50 },
      errorMessage: 'Denominacion de origen debe tener entre 1 y 50 caracteres',
    },
  },
});

module.exports = bodegaSchema;
