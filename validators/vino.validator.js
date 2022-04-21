const { checkSchema } = require('express-validator');

const vinoSchema = checkSchema({
  nombre: {
    trim: true,
    isLength: {
      options: { min: 1, max: 50 },
      errorMessage: 'Nombre debe tener entre 1 y 50 caracteres',
    },
  },
  anyada: {
    isInt: {
      options: { min: 1800, max: new Date().getFullYear() },
      errorMessage: 'Añada debe estar entre 1800 y el año actual',
    },
  },
  graduacion: {
    isDecimal: {
      options: { min: 5, max: 20, decimal_digits: '0,2' },
      errorMessage: 'Graduación del alcohol debe estar entre 5.00% y 20.00%',
    },
  },
  bodega: {
    trim: true,
    isLength: {
      options: { min: 1, max: 50 },
      errorMessage: 'Bodega debe tener entre 1 y 50 caracteres',
    },
  },
  localidades: {
    trim: true,
    isLength: {
      options: { min: 1, max: 50 },
      errorMessage: 'Localidad debe tener entre 1 y 50 caracteres',
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
        const sum = json.reduce((prev, cur) => prev + Math.abs(parseFloat(cur).toFixed(2)), 0);
        const countEmpty = json.filter((v) => parseFloat(v) === 0).length;

        if (json.length === 0) throw new Error('Debe haber al menos una variedad');
        if (sum === 100 && countEmpty > 0) {
          throw new Error('Para que haya variedades sin porcentaje la suma de los porcentajes debe ser inferior al 100%');
        }
        if (sum !== 100 && countEmpty === 0) {
          throw new Error('La suma de los porcentajes es distinta del 100%');
        }
        return (sum === 100 && countEmpty === 0) || (sum < 100 && countEmpty > 0);
      },
    },
  },
});

module.exports = vinoSchema;
