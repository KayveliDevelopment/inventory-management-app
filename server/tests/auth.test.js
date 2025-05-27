const request = require('supertest');
const app = require('../app');
const { v4: uuidv4 } = require('uuid');

const username = `testuser_${uuidv4()}`;
const password = 'password';

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username, password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('username');
  });

  it('should login and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username, password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
const { sequelize } = require('../models');

afterAll(async () => {
  await sequelize.close();
});