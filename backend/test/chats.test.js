const assert = require('assert');
const Supertest = require('supertest');

const database = require('../src/database');
const app = require('../src/app');

const server = new Supertest(app.listen());

describe('Chat', () => {
  before(async () => {
    await database.sync({ force: true });

    await database.Chat.bulkCreate([{ message: 'test message' }]);
  });

  it('should return chat information', async () => {
    const response = await server.get('/api/chats').expect(200);

    assert.equal(response.body.results.length, 1);
    assert.equal(response.body.results[0].message, 'test message');
  });

  it('should create a new message', async () => {
    const params = { message: 'created a new message' };

    const response = await server.post('/api/chats').send(params).expect(201);

    assert.equal(response.body.message, 'created a new message');
  });
});
