-- Create database
CREATE DATABASE IF NOT EXISTS internal_task_system;
USE internal_task_system;

-- Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('employee','manager','admin'),
  department VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tasks table
CREATE TABLE tasks (
  id VARCHAR(10) PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  status ENUM('todo','in-progress','completed'),
  priority ENUM('low','medium','high'),
  assigned_to INT,
  created_by INT,
  deadline DATE,
  created_at DATE,
  FOREIGN KEY (assigned_to) REFERENCES users(id),
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Approvals table
CREATE TABLE approvals (
  id VARCHAR(10) PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  type ENUM('leave','purchase','budget','other'),
  status ENUM('pending','approved','rejected'),
  requester_id INT,
  approver_id INT NULL,
  amount DECIMAL(10,2) NULL,
  comment TEXT NULL,
  created_at DATE,
  updated_at DATE NULL,
  FOREIGN KEY (requester_id) REFERENCES users(id),
  FOREIGN KEY (approver_id) REFERENCES users(id)
);

-- Insert Users
INSERT INTO users (id, name, email, password, role, department) VALUES
(1, 'สมชาย ใจดี', 'somchai@company.com', '$2b$10$BBnWRNcAYncSE.LkDSc/r.UDvFOFzHiLGlJlD4ZoBa03VUBbjsiXq', 'employee', 'การตลาด'),
(2, 'สมหญิง มั่นใจ', 'somying@company.com', '$2b$10$BBnWRNcAYncSE.LkDSc/r.UDvFOFzHiLGlJlD4ZoBa03VUBbjsiXq', 'manager', 'การตลาด'),
(3, 'ผู้จัดการ ใหญ่', 'admin@company.com', '$2b$10$BBnWRNcAYncSE.LkDSc/r.UDvFOFzHiLGlJlD4ZoBa03VUBbjsiXq', 'admin', 'บริหาร'),
(4, 'พนักงาน ขยัน', 'employee@company.com', '$2b$10$BBnWRNcAYncSE.LkDSc/r.UDvFOFzHiLGlJlD4ZoBa03VUBbjsiXq', 'employee', 'ขาย');

-- Insert Tasks
INSERT INTO tasks VALUES
('t1','จัดทำรายงานยอดขายประจำเดือน','สรุปยอดขายทุกสาขาและวิเคราะห์แนวโน้ม','in-progress','high',1,2,'2026-02-28','2026-02-20'),
('t2','ประชุมทีมการตลาด','วางแผนแคมเปญเดือนมีนาคม','todo','medium',1,2,'2026-02-26','2026-02-22'),
('t3','ตรวจสอบสต็อกสินค้า','ตรวจนับสินค้าคงเหลือในคลังทุกรายการ','completed','low',4,2,'2026-02-24','2026-02-18');

-- Insert Approvals
INSERT INTO approvals VALUES
('a1','ขอลาพักร้อน 3 วัน','ขอลาพักร้อนเพื่อไปเที่ยวกับครอบครัว วันที่ 5-7 มีนาคม 2026','leave','pending',1,NULL,NULL,NULL,'2026-02-23',NULL),
('a2','ขออนุมัติซื้อคอมพิวเตอร์ใหม่','เครื่องเก่าใช้งานมา 5 ปี','purchase','approved',4,2,25000,'อนุมัติตามที่เสนอ','2026-02-20','2026-02-22'),
('a3','ขอจัดสรรงบประมาณโฆษณา','ขอจัดสรรงบประมาณแคมเปญออนไลน์','budget','pending',1,NULL,50000,NULL,'2026-02-24',NULL),
('a4','ขอลาป่วย','ป่วยเป็นไข้หวัด','leave','rejected',4,2,NULL,'ไม่มีวันลาคงเหลือ','2026-02-15','2026-02-16');