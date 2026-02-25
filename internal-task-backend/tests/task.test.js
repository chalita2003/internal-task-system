const request = require('supertest');
const app = require('../src/app');
const db = require('../src/config/db');

describe('Task API', () => {
  let token;
  let userId;

  beforeAll(async () => {
    // Register and login a test user
    const registerResponse = await request(app)
      .post('/auth/register')
      .send({
        name: 'Task Test User',
        email: 'tasktest@example.com',
        password: 'password123',
        role: 'employee'
      });

    userId = registerResponse.body.userId;

    const loginResponse = await request(app)
      .post('/auth/login')
      .send({
        email: 'tasktest@example.com',
        password: 'password123'
      });

    token = loginResponse.body.token;
  });

  afterAll(async () => {
    // Cleanup test user
    await db.execute('DELETE FROM users WHERE email = ?', ['tasktest@example.com']);
    await db.end();
  });

  describe('POST /tasks', () => {
    it('should create a new task', async () => {
      const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Test Task',
          description: 'This is a test task',
          priority: 'medium',
          deadline: '2026-03-01'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'Task created');
      expect(response.body).toHaveProperty('taskId');
    });

    it('should return error without auth', async () => {
      const response = await request(app)
        .post('/tasks')
        .send({
          title: 'Test Task',
          description: 'This is a test task'
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Please authenticate');
    });
  });

  describe('GET /tasks', () => {
    it('should get user tasks', async () => {
      const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('PUT /tasks/:id', () => {
    let taskId;

    beforeAll(async () => {
      // Create a task to update
      const createResponse = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Task to Update',
          description: 'This task will be updated',
          priority: 'low'
        });

      taskId = createResponse.body.taskId;
    });

    it('should update task status', async () => {
      const response = await request(app)
        .put(`/tasks/${taskId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          status: 'in-progress'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Task updated');
    });
  });
});