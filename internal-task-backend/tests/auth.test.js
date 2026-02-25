const request = require('supertest');
const app = require('../src/app');
const db = require('../src/config/db');

describe('Auth API', () => {
  beforeAll(async () => {
    // Setup test database if needed
  });

  afterAll(async () => {
    // Cleanup
    await db.end();
  });

  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          role: 'employee'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'สมัครสมาชิกสำเร็จ');
      expect(response.body).toHaveProperty('userId');
    });

    it('should return error for duplicate email', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          name: 'Test User 2',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Email นี้ถูกใช้งานแล้ว');
    });

    it('should return error for missing fields', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          name: 'Test User',
          email: 'test2@example.com'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'กรอกข้อมูลไม่ครบ');
    });
  });

  describe('POST /auth/login', () => {
    it('should login with correct credentials', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'เข้าสู่ระบบสำเร็จ');
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
    });

    it('should return error for wrong password', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Email หรือ Password ไม่ถูกต้อง');
    });

    it('should return error for non-existent user', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Email หรือ Password ไม่ถูกต้อง');
    });
  });
});