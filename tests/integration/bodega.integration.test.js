"use strict";

const pool = require('../../models/db');
const { request } = require("https");
const CBodega = require("../../controllers/controllerBodega.js");
const modelBodega = require("../../models/modelBodega");

describe('mostrar bodega con ID = 1', () => {

    afterAll(() => {
        pool.end();
    });

    test('En controller', async () => {
        let request = { query: { id: 1 } };
        const res = {};
            res.render = (detalles,datos) => res;
        CBodega.mostrarDetallesBodega(request, res);
        expect(true);
    });

    test('En modelo', async () => {
        const [result] = await modelBodega.find(1);
        expect(result).not.toBe(undefined);
        expect(result.id).toBe(1);
    });
});