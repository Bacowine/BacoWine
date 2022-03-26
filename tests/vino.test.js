const pool = require('../models/db');
const modelVinos = require('../models/modelVinos');
const CVinos = require('../controllers/controllerVinos.js');
const fs = require("fs");
const { exitCode } = require('process');

afterAll(() => {

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

describe('añadir vino', () => {

  test('Añadir vino ejemplo modelo', async () => {
    let img = fs.readFileSync(__dirname + "/img/shopping.jpg");
    let id = await modelVinos.insert(["CM 2017", "Tinto", "Tranquilo", 14, "Carlos Moro", "rioja", img]);
    expect(id).not.toBe(undefined);
    const sql = pool.format("DELETE FROM vino WHERE nombre = ?", ["CM 2017"]);
    pool.promise().query(sql);
  });

  test('Añadir vino ejemplo modelo INVALIDO', async () => {
    let id = await modelVinos.insert([]);
    expect(id).not.toBe(undefined);
    const sql = pool.format("DELETE FROM vino WHERE nombre = ?", ["CM 2017"]);
    pool.promise().query(sql);
  });
});

