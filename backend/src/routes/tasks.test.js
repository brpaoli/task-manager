const request = require('supertest');
const app = require('../app');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODljNzgyNzNjMDZiODE1MDQyNTczMSIsImVtYWlsIjoiZnJvZG8uYm9sc2Vpcm9AdGVzdGUuY29tIiwiaWF0IjoxNzIwNTMwODYzLCJleHAiOjE3MjA1MzgwNjN9.gDbRTGGJUavo684HJ4t6jstIIjdI086-Dq821Z-e7PM'
const { mongoConnect, mongoDisconnect } = require('../services/mongo');
jest.setTimeout(60000); 

describe('Testando as rotas de /task', () => {
    beforeAll(async () => {
        await mongoConnect();
    });
    afterAll(async () => {
        await mongoDisconnect();
    });
    describe('Test GET /tasks', () => {
        test('Deve responder com 200 sucesso', async () => {
            const response = await request(app)
                .get('/tasks')
                .set('Authorization', `Bearer ${token}`)
                expect(200);
        });
    });
    
    describe('Test POST /tasks', () => {
        test('Deve responder com 200 sucesso', async () => {
            const response = await request(app)
                .post('/tasks')
                .set('Authorization', `Bearer ${token}`)
                .send({
            "projectId": "668202d9b241862fba9d4960",
            "title": "Ir para academia na segunda",
            "description": "Ir para a academia em plena segunda-feira",
            "status": "concluída",
            "completedBy": "6681b777b5851ca1ea7ac8e6"
        })
                expect(200);
        });
    });
});

