const request = require('supertest');
const app = require('../index');

//npm test __tests/app.test.js
describe('Test GET /auth/oauth', () => {
    test('It should return 200 OK', async () => {
        const response = await request(app).get('/auth/oauth');
        expect(response.statusCode).toBe(302);
    });
});
