const request = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const pool = require('../models/db');
const modelBodega = require('../models/modelBodega');
const modelUser = require('../models/modelUser');
const modelVino = require('../models/modelVino');
const {
  MockVino, MockVariedad, MockBodega, MockLogin,
} = require('./_mocks');

let agent;

afterAll(() => {
  pool.end();
});

test('GET / should return 200', async () => {
  const response = await request(app).get('/').send();
  expect(response.statusCode).toBe(200);
});

test('GET /vino/detalles should return 200', async () => {
  const resultId = await modelVino.insert(Object.values(MockVino), MockVariedad);
  const response = await request(app).get(`/vino/detalles?id=${resultId}`).send();
  expect(response.statusCode).toBe(200);
});

test('GET /bodega/mostrarBodega should return 200', async () => {
  const response = await request(app).get('/bodega/detalles?id=1').send();
  expect(response.statusCode).toBe(200);
});

describe('Rutas protegidas sin autenticarse', () => {
  test('GET /vino/agregarVinos GET should return 302', async () => {
    const response = await request(app).get('/vino/agregarVino').send();
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe('/login');
  });

  test('GET /bodega/agregarBodega GET should return 302', async () => {
    const response = await request(app).get('/bodega/agregarBodega').send();
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe('/login');
  });

  test('POST /vino/agregarVinos POST should return 302', async () => {
    const response = await request(app).post('/vino/agregarVino').send(MockVino);
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe('/login');
  });

  test('POST /vino/borrarVino should return 302', async () => {
    const resultId = await modelVino.insert(Object.values(MockVino), MockVariedad);
    const response = await request(app).post('/vino/borrarVino').send({ id: resultId });

    expect(resultId).not.toBeNaN();
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe('/login');
  });

  test('POST /bodega/agregarBodega should return 302', async () => {
    const response = await request(app).post('/bodega/agregarBodega').send(MockBodega);
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe('/login');
  });

  test('POST /bodega/borrarBodega should return 302', async () => {
    const resultId = await modelBodega.add(Object.values(MockBodega));
    const response = await request(app).post('/bodega/borrarBodega').send({ id: resultId });

    expect(resultId).not.toBeNaN();
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe('/login');
  });
});

describe('Rutas protegidas autenticado como admin', () => {
  const login = MockLogin;
  beforeAll(async () => {
    agent = request.agent(app);
    const hash = await bcrypt.hash(login.password, 10);
    const { password } = login;
    login.role = 'GC';
    login.password = hash;

    const resultId = await modelUser.create(Object.values(login));
    const response = await agent.post('/login').send({ user: login.user, password });

    expect(response.statusCode).toBe(302);
    expect(resultId).not.toBeNaN();
  });

  afterAll(async () => {
    await modelUser.delete(login.user);
  });

  test('GET /login GET should return 302, redirect to /', async () => {
    const response = await agent.get('/login').send();
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe('/');
  });

  test('POST /vino/agregarVinos POST should return 200', async () => {
    const vino = { ...MockVino, variedad: JSON.stringify(MockVariedad) };
    const response = await agent.post('/vino/agregarVino').send(vino);
    expect(response.statusCode).toBe(200);
  });

  test('POST /vino/borrarVino should return 302', async () => {
    const resultId = await modelVino.insert(Object.values(MockVino), MockVariedad);
    const response = await agent.post('/vino/borrarVino').send({ id: resultId });

    expect(resultId).not.toBeNaN();
    expect(response.statusCode).toBe(302);
  });

  test('POST /bodega/agregarBodega should return 200', async () => {
    const response = await agent.post('/bodega/agregarBodega').send(MockBodega);
    expect(response.statusCode).toBe(200);
  });

  test('POST /bodega/agregarBodega with invalid year should return 500', async () => {
    const bodega = MockBodega;
    bodega.anyoCreacion = '201338';

    const response = await agent.post('/bodega/agregarBodega').send(bodega);

    expect(response.statusCode).toBe(500);
  });

  test('POST /bodega/borrarBodega should return 302', async () => {
    const resultId = await modelBodega.add(Object.values(MockBodega));
    const response = await agent.post('/bodega/borrarBodega').send({ id: resultId });

    expect(resultId).not.toBeNaN();
    expect(response.statusCode).toBe(302);
  });
});

describe('Rutas protegidas autenticado como USER', () => {
  beforeAll(async () => {
    agent = request.agent(app);
    const login = MockLogin;
    login.role = 'UR';
    const hash = await bcrypt.hash(login.password, 10);
    const { password } = login;
    login.password = hash;

    const resultId = await modelUser.create(Object.values(login));
    const response = await agent.post('/login').send({ user: login.user, password });

    expect(response.statusCode).toBe(302);
    expect(resultId).not.toBeNaN();
  });

  afterAll(async () => {
    await modelUser.delete(MockLogin.user);
  });

  test('GET /vino/agregarVino should return 403 FORBIDDEN', async () => {
    const response = await agent.get('/vino/agregarVino').send();
    expect(response.statusCode).toBe(403);
  });
  test('GET /bodega/agregarBodega should return 403 FORBIDDEN', async () => {
    const response = await agent.get('/bodega/agregarBodega').send();
    expect(response.statusCode).toBe(403);
  });
});

describe('Registro como USER', () => {
  const login = MockLogin;
  login.role = 'UR';

  beforeAll(async () => {
    agent = request.agent(app);
    const response = await request(app).post('/signup').send({ user: login.user, password: login.password });

    expect(response.statusCode).toBe(302);
  });

  afterAll(async () => {
    await modelUser.delete(login.user);
  });

  test('GET /login should return 302 REDIRECT', async () => {
    await agent.post('/login').send({ user: login.user, password: login.password });
    const res = await agent.get('/login');
    await agent.post('/logout');
    console.log(res);
    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toBe('/');
  });

  test('GET /login should return 400 BAD SINTAX', async () => {
    const response = await agent.post('/login').send({ user: `${login.user}BADUSERTEST`, password: login.password });
    const res = await agent.get('/login');
    expect(response.statusCode).toBe(400);
    expect(res.statusCode).toBe(200);
  });
});
