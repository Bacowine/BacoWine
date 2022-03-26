const pool = require('../models/db');
const modelVinos = require('../models/modelVinos');

describe('vino', () => {
  afterAll(() => {
    pool.end();
  });

  describe('añadir vino', () => {
    test('añadir vino', async () => {
      const resultId = await modelVinos.insert(['nombre', 'clase', 'tipo', 0, 'bodega', 'localidades', null]);

      expect(Number.isNaN(resultId)).toBe(false);
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
  });

  describe('mostrar vino', () => {
    test('mostrar vino con ID = 1', async () => {
      const [result] = await modelVinos.find(1);

      expect(result).not.toBe(undefined);
      expect(result.id).toBe(1);
    });

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
  });
});
