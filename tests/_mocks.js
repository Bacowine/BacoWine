const MockVino = {
  nombre: 'B',
  anyada: 1999,
  clase: 'Blanco',
  tipo: 'Espirituoso',
  maceracion: 'Crianza',
  gradoAlcohol: '6',
  bodega: 'UCM',
  localidad: 'Madrid, Granada',
  foto: null,
};

const MockBodega = {
  nombre: 'Callao',
  anyoCreacion: '2018',
  localizGeo: 'Madrid',
  descripcion: 'Huele rico',
  denominOrigen: 'Madrid',
  foto: null,
};

const MockVariedad = { 'uva blanca': 50, 'uva azul': 50 };

const MockLogin = { user: 'UnitTest', password: 'UnitTest', role: 'GC' };

module.exports = {
  MockVino, MockBodega, MockVariedad, MockLogin,
};
