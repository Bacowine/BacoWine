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
    notEmpty: true,
    errorMessage: 'Año de creacion no puede estar vacio',
    isDate: {
      options: { format: 'YYYY' },
      errorMessage: 'Año de creacion formato debe ser YYYY',
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
