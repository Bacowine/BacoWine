const pool = require('../models/db');
const CBodega = require('../controllers/controllerBodega');
const modelBodega = require('../models/modelBodega');

describe('bodega', () => {
  afterAll(() => {
    pool.end();
  });

  describe('model bodega', () => {
    test('ver bodega con id=1', async () => {
      const [result] = await modelBodega.find(1);
      expect(result).not.toBe(undefined);
      expect(result.id).toBe(1);
    });

    test('agregar bodega con alfanumericos', async () => {
      let result;
      let err;

      try {
        result = await modelBodega.add(['Azpilicueta', 1929, 'Rioja', 'Muy bonito', 'Rioja', 0]);
        console.log(result);
      } catch (e) {
        console.log(e);
        err = e;
      }
      expect(result).toEqual(expect.any(Number));
      expect(err).toBe(undefined);
    });

    test('agregar bodega con anyo incorrecto', async () => {
      let result;
      let err;

      try {
        result = await modelBodega.add(['Azpilicueta', '*&*&(', 'Rioja', 'Muy bonito', 'Rioja', 0]);
      } catch (e) {
        err = e;
      }
      expect(result).toBe(undefined);
      expect(err).toBeInstanceOf(Error);
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
