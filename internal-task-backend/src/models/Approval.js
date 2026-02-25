const db = require('../config/db');

class Approval {
  static async create(title, description, type, userId, amount = null) {
    // Generate id like a1, a2, etc.
    const [rows] = await db.execute('SELECT MAX(CAST(SUBSTRING(id, 2) AS UNSIGNED)) as maxId FROM approvals');
    const nextId = rows[0].maxId ? rows[0].maxId + 1 : 1;
    const id = 'a' + nextId;
    const [result] = await db.execute(
      'INSERT INTO approvals (id, title, description, type, status, requester_id, amount, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, CURDATE())',
      [id, title, description, type, 'pending', userId, amount]
    );
    return id;
  }

  static async findAll(userId, role) {
    if (role === 'admin' || role === 'manager') {
      const [rows] = await db.execute('SELECT * FROM approvals');
      return rows;
    } else {
      const [rows] = await db.execute(
        'SELECT * FROM approvals WHERE requester_id = ?',
        [userId]
      );
      return rows;
    }
  }

  static async updateStatus(id, status, approverId, comment = '') {
    await db.execute('UPDATE approvals SET status = ?, approver_id = ?, comment = ?, updated_at = CURDATE() WHERE id = ?', [status, approverId, comment, id]);
  }
}

module.exports = Approval;