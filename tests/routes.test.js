const request = require('supertest');
const app = require('../app');

describe('GET Endpoints', () => {
  describe('/', () => {
    test('/ should return 200', async () => {
      const response = await request(app).get('/').send();
      expect(response.statusCode).toBe(200);
    });
  });

  describe('/vinos', () => {
    test('/vinos/agregarVinos should return 200', async () => {
      const vino = {
        nombre: 'B',
        gradoAlcohol: '0.26',
        bodega: 'UCM',
        localidad: 'Madrid, Granada',
        clase: 'Blanco',
        tipo: 'Espirituoso',
      };
      const response = await request(app).post('/vinos/agregarVino').send(vino);
      expect(response.statusCode).toBe(200);
    });

    test('/vinos/mostrarVino should return 200', async () => {
      const response = await request(app).get('/vinos/mostrarVino?id=1').send();
      expect(response.statusCode).toBe(200);
    });
  });

  describe('/bodega', () => {
    test('/bodega/agregarBodega should return 200', async () => {
      const bodega = {
        nombre: 'Callao',
        anyoCreacion: '2018',
        localizGeo: 'Madrid',
        descripcion: 'Huele rico',
        denominOrigen: 'Madrid',
        foto: null,
      };
      const response = await request(app).post('/bodega/agregarBodega').send(bodega);
      expect(response.statusCode).toBe(200);
    });

    test('/bodega/mostrarBodega should return 200', async () => {
      const response = await request(app).get('/bodega/detalles?id=1').send();
      expect(response.statusCode).toBe(200);
    });
  });
});
