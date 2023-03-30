const request = require('supertest');
const app = require('../../index'); 
//npm test __tests/routes/auth.test.js
describe('POST /auth/register', () => {
    test('It should not register a new user because it exists', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                username: 'jameererwer',
                email: '12weres@qq.com',
                password: '123456',
            });

        expect(response.statusCode).toBe(400);
    });
});

describe('POST /auth/login', () => {
    test('It should log in a user', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                email: '12weres@qq.com',
                password: '123456',
            });

        expect(response.statusCode).toBe(200);
    });
});

describe('PUT /users/:userId', () => {
    test('It should update a user\'s password', async () => {
        const response = await request(app)
            .put('/users/6424feb81a58920035cdf9d5')
            .send({
                userId: "6424feb81a58920035cdf9d5",
                password: '123456',
            });

        expect(response.statusCode).toBe(200);
    });
});

describe('GET /users/:userId', () => {
    test('It should get a user by ID', async () => {
        const response = await request(app)
            .get('/users/6423b0c3cdadd3609cc09240');

        expect(response.statusCode).toBe(200);
    });
});