const { checkSchema } = require('express-validator');

const vinoSchema = checkSchema({
  nombre: {
    trim: true,
    isLength: {
      options: { min: 1, max: 50 },
      errorMessage: 'Nombre debe tener entre 1 y 50 caracteres',
    },
  },
  gradoAlcohol: {
    isDecimal: {
      options: { min: 0, max: 20, decimal_digits: '0,2' },
      errorMessage: 'Graduación del alcohol debe estar entre 0.00% y 20.00%',
    },
  },
  bodega: {
    trim: true,
    isLength: {
      options: { min: 1, max: 59 },
      errorMessage: 'Bodega debe tener entre 1 y 59 caracteres',
    },
  },
  localidad: {
    trim: true,
    isLength: {
      options: { min: 1, max: 20 },
      errorMessage: 'Localidad debe tener entre 1 y 20 caracteres',
    },
  },
  clase: {
    trim: true,
    isIn: {
      options: [['Blanco', 'Rosado', 'Tinto', 'Clarete', 'Blanc de blanc', 'Blanc de noirs', 'Vino de nueces', 'Vino especiado', 'Otros']],
      errorMessage: 'Clase no contiene una clase correcta',
    },
  },
  tipo: {
    trim: true,
    isIn: {
      options: [['Tranquilo', 'Espumoso', 'Espirituoso', 'Vino oloroso']],
      errorMessage: 'Tipo no contiene un tipo correcto',
    },
  },
  maceracion: {
    trim: true,
    isIn: {
      options: [['Crianza', 'Joven', 'Roble', 'Reserva', 'Gran Reserva']],
      errorMessage: 'Maceracion no contiene una opcion correcta',
    },
  },
  variedad: {
    isJSON: true,
    errorMessage: 'Variedad no tiene un formato válido',
    custom: {
      options: (value) => {
        const json = Object.values(JSON.parse(value));
        const sum = json.reduce((prev, cur) => prev + Math.abs(parseInt(cur, 10)), 0);
        return sum === 100;
      },
      errorMessage: 'Variedad la suma de los porcentajes no es 100%',
    },
  },
});

module.exports = vinoSchema;
