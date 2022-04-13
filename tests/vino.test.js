const fs = require('fs');
const pool = require('../models/db');
const modelVinos = require('../models/modelVino');
const CVinos = require('../controllers/controllerVino');
const { MockVino, MockVariedad } = require('./_mocks');

afterAll(() => {
  pool.end();
});

test('Añadir vino ejemplo modelo', async () => {
  const img = fs.readFileSync(`${__dirname}/img/shopping.jpg`);
  const id = await modelVinos.insert(['CM 2017', 'Tinto', 'Tranquilo', 'Maceracion', 14, 'Carlos Moro', 'rioja', img], { a: 10 });
  expect(id).not.toBe(undefined);
  const sql = pool.format('DELETE FROM vino WHERE nombre = ?', ['CM 2017']);
  pool.promise().query(sql);
});

test('Añadir vino ejemplo controlador', async () => {
  const mReq = {
    body: {
      ...MockVino, variedad: JSON.stringify(MockVariedad),
    },
    errors: { lenght: 0 },
    files: [fs.readFileSync(`${__dirname}/img/shopping.jpg`)],
  };
  const mRes = { status: jest.fn(), render: jest.fn() };
  const mNext = jest.fn();
  await CVinos.agregarVino(mReq, mRes, mNext);
  expect(mRes.render).toBeCalled();
  const sql = pool.format('DELETE FROM vino WHERE nombre = ?', ['CM 2017']);
  await pool.promise().query(sql);
});

test('añadir vino con datos invalidos', async () => {
  let resultId;
  let err;
  try {
    resultId = await modelVinos.insert(['nombre', null, 'tipo', 0, 'bodega', 'localidades', null]);
  } catch (error) {
    err = error;
  }

  expect(resultId).toBe(undefined);
  expect(err).toBeInstanceOf(Error);
});
/* Fallara si no hay vinos
test('mostrar vino con ID = 1', async () => {
  const [result] = await modelVinos.find(1);

  expect(result).not.toBe(undefined);
  expect(result.id).toBe(1);
});
*/
test('mostrar vino que no existe', async () => {
  let result;
  let err;

  try {
    [result] = await modelVinos.find(100000000);
  } catch (e) {
    err = e;
  }

  expect(result).toBe(undefined);
  expect(err).toBe(undefined);
});

test('Añadir comentario a un vino como UR, modelo', async () => {
  const id = await modelVinos.comentarVino(['a', '7', 'Test de comentar vino modelo']);
  expect(id).not.toBe(undefined);
  const sql = pool.format('DELETE FROM comentario WHERE id = ?', [id]);
  await pool.promise().query(sql);
});

test('Añadir comentario a un vino como UR, controlador', async () => {
  const mReq = {
    body: {
      idVino: '7', texto: 'Test de comentar vino controlador'
    },
    session: {
      user: { name: 'a', role: 'UR' }
    },
    errors: { lenght: 0 },
  };
  const mRes = { status: jest.fn(), render: jest.fn(), redirect: jest.fn() };
  const mNext = jest.fn();
  await CVinos.comentarVino(mReq, mRes, mNext);
  expect(mRes.redirect).toBeCalled();
  const sql = pool.format('DELETE FROM comentario WHERE texto = ?', ['Test de comentar vino controlador']);
  await pool.promise().query(sql);
});

test('Añadir comentario a un vino como GC, controlador', async () => {
  const mReq = {
    body: {
      idVino: '7', texto: 'Test de comentar vino controlador como GC'
    },
    session: { 
      user: { name: 'b', role: 'GC' }
    },
    errors: { lenght: 0 },
  };
  const mRes = { status: jest.fn(), render: jest.fn() };
  const mNext = jest.fn();
  await CVinos.comentarVino(mReq, mRes, mNext);
  expect(mRes.status).toBeCalledWith(403);
});

test('Añadir comentario a un vino como UNR, controlador', async () => {
  const mReq = {
    body: {
      idVino: '7', texto: 'Test de comentar vino controlador como UNR'
    },
    session: { },
    errors: { lenght: 0 },
  };
  const mRes = { status: jest.fn(), render: jest.fn() };
  const mNext = jest.fn();
  await CVinos.comentarVino(mReq, mRes, mNext);
  expect(mRes.status).toBeCalledWith(403);
});
