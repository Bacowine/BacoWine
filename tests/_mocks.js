const MockVino = {
  nombre: 'B',
  anyada: 1999,
  clase: 'Blanco',
  maceracion: 'Crianza',
  graduacion: '6',
  bodega: 'UCM',
  localidades: 'Madrid, Granada',
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
