const request = require('supertest');
const app = require('../../index');
//npm test __tests/routes/admin.test.js
// Test POST /admin endpoint, created so it would be 400
describe('Test POST /admin', () => {
    test('It should return 200 OK', async () => {
        const response = await request(app)
            .post('/admin')
            .send({
                username: 'admin',
                roles: ['admin'],
                password: 'password',
            });
        expect(response.statusCode).toBe(400);
    });
});

// Test GET /admin endpoint
describe('Test GET /admin', () => {
    test('It should return 200 OK', async () => {
        const response = await request(app).get('/admin');
        expect(response.statusCode).toBe(200);
    });
});

// Test GET /admin/:id endpoint
describe('Test GET /admin/:id', () => {
    test('It should return 200 OK', async () => {
        const response = await request(app).get('/admin/6423b2b64a0b4451082ee035');
        expect(response.statusCode).toBe(200);
    });
});

// Test PUT /admin/:id endpoint
describe('Test PUT /admin/:id', () => {
    test('It should return 200 OK', async () => {
        const response = await request(app)
            .put('/admin/6423b31a4a0b4451082ee03d')
            .send({
                roles: ['superadmin'],
            });
        expect(response.statusCode).toBe(200);
    });
});