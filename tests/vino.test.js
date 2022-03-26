const pool = require('../models/db');
const modelVinos = require('../models/modelVinos');

describe('mostrar vino', () => {
  afterAll(() => {
    pool.end();
  });

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
