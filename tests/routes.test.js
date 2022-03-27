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
  });
});
