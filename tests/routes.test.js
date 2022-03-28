const request = require('supertest');
const app = require('../app');
const pool = require('../models/db');
const modelBodega = require('../models/modelBodega');
const modelVino = require('../models/modelVino');

afterAll(() => {
  pool.end();
});

test('GET / should return 200', async () => {
  const response = await request(app).get('/').send();
  expect(response.statusCode).toBe(200);
});

test('GET /vino/detalles should return 200', async () => {
  const vino = ['B', 'Blanco', 'Espirituoso', '0.26', 'UCM', 'Madrid, Granada', null];
  const resultId = await modelVino.insert(vino);
  const response = await request(app).get(`/vino/detalles?id=${resultId}`).send();
  expect(response.statusCode).toBe(200);
});

test('GET /bodega/mostrarBodega should return 200', async () => {
  const response = await request(app).get('/bodega/detalles?id=1').send();
  expect(response.statusCode).toBe(200);
});

test('POST /vino/agregarVinos POST should return 200', async () => {
  const vino = {
    nombre: 'B',
    gradoAlcohol: '0.26',
    bodega: 'UCM',
    localidad: 'Madrid, Granada',
    clase: 'Blanco',
    tipo: 'Espirituoso',
  };
  const response = await request(app).post('/vino/agregarVino').send(vino);
  expect(response.statusCode).toBe(200);
});

test('POST /vino/borrarVino should return 302', async () => {
  const vino = ['B', 'Blanco', 'Espirituoso', '0.26', 'UCM', 'Madrid, Granada', null];
  const resultId = await modelVino.insert(vino);
  const response = await request(app).post('/vino/borrarVino').send({ id: resultId });

  expect(resultId).not.toBeNaN();
  expect(response.statusCode).toBe(302);
});

test('POST /bodega/agregarBodega should return 200', async () => {
  const bodega = {
    nombre: 'Callao',
    anyoCreacion: '2018',
    localizGeo: 'Madrid',
    descripcion: 'Huele rico',
    denominOrigen: 'Madrid',
  };
  const response = await request(app).post('/bodega/agregarBodega').send(bodega);
  expect(response.statusCode).toBe(200);
});

test('POST /bodega/agregarBodega should return 500', async () => {
  const bodega = {
    nombre: 'Callao',
    anyoCreacion: '201338',
    localizGeo: 'Madrid',
    descripcion: 'Huele rico',
    denominOrigen: 'Madrid',
    foto: null,
  };
  const response = await request(app).post('/bodega/agregarBodega').send(bodega);
  expect(response.statusCode).toBe(500);
});

test('POST /bodega/borrarBodega should return 302', async () => {
  const bodega = ['SeAcabo', 1970, 'Rioja', 'PorFin', 'Rioja', null];
  const resultId = await modelBodega.add(bodega);
  const response = await request(app).post('/bodega/borrarBodega').send({ id: resultId });

  expect(resultId).not.toBeNaN();
  expect(response.statusCode).toBe(302);
});
