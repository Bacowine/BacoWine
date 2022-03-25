const pool = require('../../models/db');
const modelBodega = require('../../models/modelBodega');

describe('agregar bodega', () => {
  afterAll(() => {
    pool.end();
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
