require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');  

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/shorten', () => {
  it('should return a unique short code for a valid URL', async () => {
    const res = await request(app).post('/api/shorten').send({
      url: 'https://example.com/test-url',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('code');
    expect(typeof res.body.code).toBe('string');
    expect(res.body.code.length).toBeGreaterThan(0);
  });

  it('should return 400 for an invalid URL', async () => {
    const res = await request(app).post('/api/shorten').send({
      url: 'invalid-url',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if no URL is provided', async () => {
    const res = await request(app).post('/api/shorten').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
