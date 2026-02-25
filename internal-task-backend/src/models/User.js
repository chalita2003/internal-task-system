const db = require('../config/db');

class User {
  static async create(name, email, password, role = 'employee', department = null) {
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password, role, department) VALUES (?, ?, ?, ?, ?)',
      [name, email, password, role, department]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT id, name, email, role, department FROM users WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = User;