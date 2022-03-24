const pool = require('../../models/db');
const modelBodega = require('../../models/modelBodega');

describe('agregar bodega', () => {
    afterAll(() => {
      pool.end();
    });

    test('agregar bodega con alfanumericos', async () => {
        const [result] = await modelBodega.add('Azpilicueta', 1929, 'Rioja', 'Muy bonito', 'Rioja', null);

        //expect(result).not.toBeNaN();
        expect(result).toEqual(expect.any(Number));
    });

    test('agregar bodega con anyo incorrecto', async () => {


        try {
            const [result] = await modelBodega.add('Azpilicueta', '*&*&(', 'Rioja', 'Muy bonito', 'Rioja', null);
        }
        catch(e) {
            err = e;
        }
        expect(result).toBe(undefined);
        expect(err).toBe(undefined);
    });

    test('agregar bodega con valores no alfanumericos', async () => {
        let result;
        let err;
        
        try {
            [result] = await modelBodega.add('+*-', ')&*^', '*/*-*', '+++', '@#$', null);
        }
        catch(e) {
            err = e;
        }
       
        expect(result).toBe(undefined);
        expect(err).toBe(undefined);
    });

});