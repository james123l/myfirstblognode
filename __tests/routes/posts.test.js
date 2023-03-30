const request = require('supertest');
const app = require('../../index');
const uuid = require("uuid")

//npm test __tests/routes/posts.test.js
let postId;
describe('POST /posts', () => {
    it('should create a new post', async () => {
        const post = {
            categories: ["test"],
            username: 'james',
            desc: 'test',
            title: uuid.v4(),
        };
        const response = await request(app)
            .post('/posts/640d66eaae0c500034a983e2')
            .send(post)
            .set('Content-Type', 'application/json')
            .expect(200);
        
        

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toEqual(post.title);
        expect(response.body.desc).toEqual(post.desc);
        expect(response.body.categories).toEqual(post.categories);
        expect(response.body.username).toEqual(post.username);

        postId = response.body._id;
    });
});

describe('GET /posts', () => {
    it('should get all posts', async () => {
        const response = await request(app)
            .get('/posts')
            .expect(200);

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
});

describe('GET /posts/:id', () => {
    it('should get a specific post by ID', async () => {
        const response = await request(app)
            .get(`/posts/${postId}`)
            .expect(200);

        expect(response.statusCode).toBe(200);
        expect(response.body._id).toEqual(postId);
    });
});

describe('PUT /posts/:id', () => {
    it('should update a post by ID', async () => {
        const updatedPost = {
            title: 'Updated Post',
            desc: 'This post has been updated',
            photo: '',
            username: 'user1',
            categories: ['category1', 'category2'],
        };
        const response = await request(app)
            .put(`/posts//640d66eaae0c500034a983e2`)
            .send(updatedPost)
            .set('Content-Type', 'application/json')
            .expect(200);

        expect(response.statusCode).toBe(200);    
    });
});
