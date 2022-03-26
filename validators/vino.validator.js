const { checkSchema } = require('express-validator');

const vinoSchema = checkSchema({
  nombre: {
    notEmpty: true,
    errorMessage: 'Nombre no puede estar vacio',
    isLength: {
      options: { min: 1, max: 50 },
      errorMessage: 'Nombre debe tener entre 1 y 50 caracteres',
    },
  },
  gradoAlcohol: {
    notEmpty: true,
    errorMessage: 'Graduación del alcohol no puede estar vacio',
    isDecimal: {
      options: { min: 0, max: 20, decimal_digits: '0,2' },
      errorMessage: 'Graduación del alcohol debe estar entre 0.00% y 20.00%',
    },

  },
  bodega: {
    notEmpty: true,
    errorMessage: 'Bodega no puede estar vacio',
    isLength: {
      options: { min: 1, max: 59 },
      errorMessage: 'Bodega debe tener entre 1 y 59 caracteres',
    },
  },
  localidad: {
    notEmpty: true,
    errorMessage: 'Localidad no puede estar vacio',
    isLength: {
      options: { min: 1, max: 20 },
      errorMessage: 'Localidad debe tener entre 1 y 20 caracteres',
    },
  },
  clase: {
    notEmpty: true,
    errorMessage: 'Clase no puede estar vacio',
    isIn: {
      options: [['Blanco', 'Rosado', 'Tinto', 'Clarete', 'Blanc de blanc', 'Blanc de noirs', 'vino de nueces', 'vino especiado', 'Otros']],
      errorMessage: 'Clase no contiene una clase correcta',
    },
  },
  tipo: {
    notEmpty: true,
    errorMessage: 'Tipo no puede estar vacio',
    isIn: {
      options: [['Tranquilo', 'Espumoso', 'Espirituoso', 'Vino oloroso']],
      errorMessage: 'Tipo no contiene un tipo correcto',
    },
  },
});

module.exports = vinoSchema;
