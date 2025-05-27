const request = require('supertest');
const app = require('../app');

let token;
const username = `testuser_${Date.now()}`;
const password = 'password';

beforeAll(async () => {
  await request(app)
    .post('/api/auth/register')
    .send({ username, password });

  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({ username, password });

  token = loginRes.body.token;
});

describe('Inventory API', () => {
  it('should fetch inventory items', async () => {
    const res = await request(app)
      .get('/api/inventory')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new item', async () => {
    const res = await request(app)
      .post('/api/inventory')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: `Item_${Date.now()}`,
        quantity: 5,
        price: 99.99,
        description: 'Test item',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
  });
  
});
const { sequelize } = require('../models');

afterAll(async () => {
  await sequelize.close();
});