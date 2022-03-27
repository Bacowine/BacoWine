const pool = require('../models/db');
const modelVinos = require('../models/modelVinos');
const CVinos = require('../controllers/controllerVinos.js');
const fs = require("fs");
const { exitCode } = require('process');

afterAll(() => {

});


describe('vino', () => {

  describe('añadir vino', () => {
    test('Añadir vino ejemplo modelo', async () => {
      let img = fs.readFileSync(__dirname + "/img/shopping.jpg");
      let id = await modelVinos.insert(["CM 2017", "Tinto", "Tranquilo", 14, "Carlos Moro", "rioja", img]);
      expect(id).not.toBe(undefined);
      const sql = pool.format("DELETE FROM vino WHERE nombre = ?", ["CM 2017"]);
      pool.promise().query(sql);
    });

    test('Añadir vino ejemplo controlador', async () => {
      const mReq = {
        body: {
          nombre: "CM 2017", clase: "Tinto", tipo: "Tranquilo", gradoAlcohol: 14, bodega: "Carlos Moro", localidad: "rioja"
        },
        errors: { lenght: 0 },
        files: [fs.readFileSync(__dirname + "/img/shopping.jpg")]
      };
      const mRes = { status: jest.fn(), render: jest.fn() };
      const mNext = jest.fn();
      await CVinos.agregarVino(mReq, mRes, mNext);
      expect(mRes.render).toBeCalled();
      const sql = pool.format("DELETE FROM vino WHERE nombre = ?", ["CM 2017"]);
      pool.promise().query(sql);
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
