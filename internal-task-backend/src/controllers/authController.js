const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "กรอกข้อมูลไม่ครบ" });
    }

    // เช็ค email ซ้ำ
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email นี้ถูกใช้งานแล้ว" });
    }

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await User.create(
      name,
      email,
      hashedPassword,
      role || "employee",
      department || null
    );

    res.status(201).json({
      message: "สมัครสมาชิกสำเร็จ",
      userId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในระบบ" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "กรอกข้อมูลไม่ครบ" });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Email หรือ Password ไม่ถูกต้อง" });
    }

    // Compare password with hashed password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Email หรือ Password ไม่ถูกต้อง" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "เข้าสู่ระบบสำเร็จ",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในระบบ" });
  }
};