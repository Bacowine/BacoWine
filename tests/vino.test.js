const fs = require('fs');
const pool = require('../models/db');
const modelVinos = require('../models/modelVino');
const CVinos = require('../controllers/controllerVino');
const { MockVino, MockVariedad } = require('./_mocks');

afterAll(() => {
  pool.end();
});

test('Añadir vino ejemplo modelo', async () => {
  const mock = MockVino;
  mock.foto = fs.readFileSync(`${__dirname}/img/shopping.jpg`);
  const id = await modelVinos.insert(Object.values(mock), { a: 10 });
  expect(id).not.toBe(undefined);
  const sql = pool.format('DELETE FROM vino WHERE nombre = ?', ['CM 2017']);
  await pool.promise().query(sql);
});

test('Añadir vino ejemplo controlador', async () => {
  const mReq = {
    body: {
      ...MockVino, variedad: JSON.stringify(MockVariedad),
    },
    errors: { lenght: 0 },
    files: [fs.readFileSync(`${__dirname}/img/shopping.jpg`)],
  };
  const mRes = { status: jest.fn(), render: jest.fn(), redirect: jest.fn() };
  const mNext = jest.fn();
  await CVinos.agregarVino(mReq, mRes, mNext);
  expect(mRes.redirect).toBeCalled();
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
  const idVino = await modelVinos.insert(Object.values(MockVino), { a: 10 });
  const id = await modelVinos.comentarVino(['a', idVino, 'Test de comentar vino modelo']);
  expect(id).not.toBe(undefined);
  const sql2 = pool.format('DELETE FROM vino WHERE id = ?', [idVino]);
  await pool.promise().query(sql2);
  const sql = pool.format('DELETE FROM comentario WHERE id = ?', [id]);
  await pool.promise().query(sql);
});

test('Añadir comentario a un vino como UR, controlador', async () => {
  const idVino = await modelVinos.insert(Object.values(MockVino), { a: 10 });
  const mReq = {
    body: {
      idVino, texto: 'Test de comentar vino controlador',
    },
    session: {
      user: { name: 'a', role: 'UR' },
    },
    errors: { lenght: 0 },
  };
  const mRes = { status: jest.fn(), render: jest.fn(), redirect: jest.fn() };
  const mNext = jest.fn();
  await CVinos.comentarVino(mReq, mRes, mNext);
  expect(mRes.redirect).toBeCalled();
  const sql2 = pool.format('DELETE FROM vino WHERE id = ?', [idVino]);
  await pool.promise().query(sql2);
  const sql = pool.format('DELETE FROM comentario WHERE texto = ?', ['Test de comentar vino controlador']);
  await pool.promise().query(sql);
});

test('Añadir comentario a un vino como GC, controlador', async () => {
  const mReq = {
    body: {
      idVino: '-1', texto: 'Test de comentar vino controlador como GC',
    },
    session: {
      user: { name: 'b', role: 'GC' },
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
      idVino: '-1', texto: 'Test de comentar vino controlador como UNR',
    },
    session: { },
    errors: { lenght: 0 },
  };
  const mRes = { status: jest.fn(), render: jest.fn() };
  const mNext = jest.fn();
  await CVinos.comentarVino(mReq, mRes, mNext);
  expect(mRes.status).toBeCalledWith(403);
});

// ---------------------test valorar vino---------------

test('Añadir una valoracion a un vino, modelo', async () => {
  const idVino = await modelVinos.insert(Object.values(MockVino), { a: 10 });
  expect(idVino).not.toBe(undefined);
  const idVal = await modelVinos.valorarVino(idVino, 'a', 5);
  expect(idVal).not.toBe(undefined);
  const sql2 = pool.format('DELETE FROM vino WHERE id = ?', [idVino]);
  await pool.promise().query(sql2);
});

test('Añadir valoracion a un vino como UR, controlador', async () => {
  const idVino = await modelVinos.insert(Object.values(MockVino), { a: 10 });
  const mReq = {
    body: {
      idVino, valoracion: 10,
    },
    session: {
      user: { name: 'a', role: 'UR' },
    },
    errors: { lenght: 0 },
  };
  const mRes = { status: jest.fn(), render: jest.fn(), redirect: jest.fn() };
  const mNext = jest.fn();
  await CVinos.valorarVino(mReq, mRes, mNext);
  expect(mRes.redirect).toBeCalled();
 
  const sql2 = pool.format('DELETE FROM vino WHERE id = ?', [idVino]);
  await pool.promise().query(sql2);
});
 
test('modificar valoracion a un vino como UR, controlador', async () => {
  const idVino = await modelVinos.insert(Object.values(MockVino), { a: 10 });

  const mReq = {
    body: {
      idVino, valoracion: 10,
    },
    session: {
      user: { name: 'a', role: 'UR' },
    },
    errors: { lenght: 0 },
  };
  const mRes = { status: jest.fn(), render: jest.fn(), redirect: jest.fn() };
  const mNext = jest.fn();
  await CVinos.valorarVino(mReq, mRes, mNext);
  expect(mRes.redirect).toBeCalled();

  const mReq2 = {
    body: {
      idVino, valoracion: 8,
    },
    session: {
      user: { name: 'a', role: 'UR' },
    },
    errors: { lenght: 0 },
  };
  const mRes2 = { status: jest.fn(), render: jest.fn(), redirect: jest.fn() };
  const mNext2 = jest.fn();
  await CVinos.valorarVino(mReq2, mRes2, mNext2);
  expect(mRes2.redirect).toBeCalled();

  const valVino = await modelVinos.confirmarValoracionVino(idVino, 'a');
  expect(valVino).toBe('8.0');

  const sql2 = pool.format('DELETE FROM vino WHERE id = ?', [idVino]);
  await pool.promise().query(sql2);
});
