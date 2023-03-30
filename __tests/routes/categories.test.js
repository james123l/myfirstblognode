const request = require('supertest');
const app = require('../../index');
//npm test __tests/routes/categories.test.js
describe('Category API', () => {
    let categoryId;

    // Test POST /categories
    describe('POST /categories', () => {
        it('should create a new category', async () => {
            const userId = '640d66eaae0c500034a983e2';
            const categoryName = 'test';
            const response = await request(app)
                .post('/categories')
                .send({ userId, name: categoryName })
                .expect(200);

            expect(response.statusCode).toBe(200);
            categoryId = response.body._id;
        });
    });

    // Test PUT /categories/:id
    describe('PUT /categories', () => {
        it('should update a category', async () => {
            const updatedName = 'updated test';
            const response = await request(app)
                .put(`/categories`)
                .send({ name: updatedName , newname:"123"})
                .expect(200);
        });
    });

    // Test GET /categories
    describe('GET /categories', () => {
        it('should return all categories', async () => {
            const response = await request(app).get('/categories').expect(200);

            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBeGreaterThan(0);
        });
    });
});