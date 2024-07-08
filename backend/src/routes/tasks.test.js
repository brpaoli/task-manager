const request = require('supertest');
const app = require('../app');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODFiNzc3YjU4NTFjYTFlYTdhYzhlNiIsImVtYWlsIjoiZnJvZG8uYm9sc2Vpcm9AdGVzdGUuY29tIiwiaWF0IjoxNzIwNDQ3MzEzLCJleHAiOjE3MjA0NTQ1MTN9.OeofgSb9WTGG3ZNvktZfMbAgNCT5LQrsAZTPZHvNp5w'

jest.setTimeout(30000); 

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

// describe('Test POST /tasks', () => {
//     test('Deve responder com 200 sucesso', () => {
//         const response = 200;
//         expect(response).toBe(200);
//     });
//     test('Deve fazer o catch em propriedades que estão faltando', () => {
        
//     });
// });