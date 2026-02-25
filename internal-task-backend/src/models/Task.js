const db = require('../config/db');

class Task {
  static async create(title, description, userId, assignedTo = null, priority = 'medium', deadline = null) {
    // Generate id like t1, t2, etc.
    const [rows] = await db.execute('SELECT MAX(CAST(SUBSTRING(id, 2) AS UNSIGNED)) as maxId FROM tasks');
    const nextId = rows[0].maxId ? rows[0].maxId + 1 : 1;
    const id = 't' + nextId;
    const [result] = await db.execute(
      'INSERT INTO tasks (id, title, description, status, priority, assigned_to, created_by, deadline, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURDATE())',
      [id, title, description, 'todo', priority, assignedTo, userId, deadline]
    );
    return id;
  }

  static async findAll(userId, role) {
    if (role === 'admin') {
      const [rows] = await db.execute('SELECT * FROM tasks');
      return rows;
    } else {
      const [rows] = await db.execute(
        'SELECT * FROM tasks WHERE assigned_to = ? OR created_by = ?',
        [userId, userId]
      );
      return rows;
    }
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM tasks WHERE id = ?', [id]);
    return rows[0];
  }

  static async updateStatus(id, status) {
    await db.execute('UPDATE tasks SET status = ? WHERE id = ?', [status, id]);
  }

  // Remove softDelete since no deleted column
}

module.exports = Task;