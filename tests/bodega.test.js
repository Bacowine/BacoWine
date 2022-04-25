const pool = require('../models/db');
const CBodega = require('../controllers/controllerBodega');
const modelBodega = require('../models/modelBodega');
const { MockBodega } = require('./_mocks');
const Util = require('./_util');

afterAll(async () => {
  await Util.emptyTables(pool);
  pool.end();
});

/* Falla si no hay
test('model bodega / ver bodega con id=1', async () => {
  const [result] = await modelBodega.find(1);
  expect(result).not.toBe(undefined);
  expect(result.id).toBe(1);
}); */

test('model bodega / agregar bodega con año correcto', async () => {
  let result;
  let err;

  try {
    result = await modelBodega.add(Object.values(MockBodega));
    console.log(result);
  } catch (e) {
    console.log(e);
    err = e;
  }
  expect(result).toEqual(expect.any(Number));
  expect(err).toBe(undefined);
});

test('model bodega / agregar bodega con anyo incorrecto', async () => {
  let result;
  let err;
  const bodega = { ...MockBodega };
  bodega.anyoCreacion = '*&*&(';

  try {
    result = await modelBodega.add(Object.values(bodega));
  } catch (e) {
    err = e;
  }
  expect(result).toBe(undefined);
  expect(err).toBeInstanceOf(Error);
});

test('controller mostrar bodega / deberia lanzar un error 500 si el id es invalido', async () => {
  const mReq = { query: { id: '$$' } };
  const mRes = { status: jest.fn(), render: jest.fn() };
  const mNext = jest.fn();
  await CBodega.mostrarDetallesBodega(mReq, mRes, mNext);
  expect(mRes.status).toBeCalledWith(500);
});

test('controller mostrar bodega / deberia lanzar un error 500 si el id no existe', async () => {
  const mReq = { query: {} };
  const mRes = { status: jest.fn(), render: jest.fn() };
  const mNext = jest.fn();
  await CBodega.mostrarDetallesBodega(mReq, mRes, mNext);
  expect(mRes.status).toBeCalledWith(500);
});

test('Controller bodega / mostrar bodega', async () => {
  const resultId = await modelBodega.add(Object.values(MockBodega));

  const mReq = { query: { id: resultId } };
  const mRes = { status: jest.fn(), render: jest.fn() };
  const mNext = jest.fn();
  await CBodega.mostrarDetallesBodega(mReq, mRes, mNext);
  expect(mRes.render).toBeCalled();
  expect(resultId).not.toBe(undefined);
});
