const pool = require('../models/db');
const CBodega = require('../controllers/controllerBodega');
const modelBodega = require('../models/modelBodega');

describe('mostrar bodega', () => {
  afterAll(() => {
    pool.end();
  });

  describe('model mostrar bodega', () => {
    test('En modelo', async () => {
      const [result] = await modelBodega.find(1);
      expect(result).not.toBe(undefined);
      expect(result.id).toBe(1);
    });
  });

  describe('controller mostrar bodega', () => {
    test('deberia lanzar un error 500 si el id es invalido', async () => {
      const mReq = { query: { id: '$$' } };
      const mRes = { status: jest.fn(), render: jest.fn() };
      const mNext = jest.fn();
      await CBodega.mostrarDetallesBodega(mReq, mRes, mNext);
      expect(mRes.status).toBeCalledWith(500);
    });

    test('deberia lanzar un error 500 si el id no existe', async () => {
      const mReq = { query: { } };
      const mRes = { status: jest.fn(), render: jest.fn() };
      const mNext = jest.fn();
      await CBodega.mostrarDetallesBodega(mReq, mRes, mNext);
      expect(mRes.status).toBeCalledWith(500);
    });

    test('deberia leer la bodega por id y cargar la vista', async () => {
      const mReq = { query: { id: 1 } };
      const mRes = { status: jest.fn(), render: jest.fn() };
      const mNext = jest.fn();
      await CBodega.mostrarDetallesBodega(mReq, mRes, mNext);
      expect(mRes.render).toBeCalled();
    });
  });
});
