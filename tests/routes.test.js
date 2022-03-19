const request = require('supertest')
const app = require('../app.js')


describe('GET Endpoints', () => {
    describe('/', () => {
        test('/ should return 200', async () => {
            const response = await request(app).get('/').send();
            expect(response.statusCode).toBe(200);
        })
    })
})

