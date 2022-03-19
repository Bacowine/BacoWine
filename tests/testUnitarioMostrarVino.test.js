"use strict";

const pool = require("../models/db");
const MVinos = require("../models/modelVinos");
const modelVinos = new MVinos(pool);

test('mostrar vino con ID = 1', (done) =>  {
    modelVinos.verVino(1, cb_mostrarVino);
    function cb_mostrarVino(err, result, vino){
        expect(err).toBe(null);
        expect(result).toBe(true);
        expect(vino.id).toBe(1);
        done();
    }
});

test('mostrar vino que no existe', (done) =>  {
    modelVinos.verVino(100000000, cb_mostrarVino);
    function cb_mostrarVino(err, result, vino){
        expect(err).toBe(null);
        expect(result).toBe(false);
        expect(vino).toBe(-1);
        done();
    }
});