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
(1, 'Somchai Jaidee', 'somchai@company.com', '$2b$10$BBnWRNcAYncSE.LkDSc/r.UDvFOFzHiLGlJlD4ZoBa03VUBbjsiXq', 'employee', 'Marketing'),
(2, 'Somying Manjai', 'somying@company.com', '$2b$10$BBnWRNcAYncSE.LkDSc/r.UDvFOFzHiLGlJlD4ZoBa03VUBbjsiXq', 'manager', 'Marketing'),
(3, 'Big Manager', 'admin@company.com', '$2b$10$BBnWRNcAYncSE.LkDSc/r.UDvFOFzHiLGlJlD4ZoBa03VUBbjsiXq', 'admin', 'Management'),
(4, 'Hardworking Employee', 'employee@company.com', '$2b$10$BBnWRNcAYncSE.LkDSc/r.UDvFOFzHiLGlJlD4ZoBa03VUBbjsiXq', 'employee', 'Sales');

-- Insert Tasks
INSERT INTO tasks VALUES
('t1','Prepare Monthly Sales Report','Summarize sales from all branches and analyze trends','in-progress','high',1,2,'2026-02-28','2026-02-20'),
('t2','Marketing Team Meeting','Plan campaigns for March','todo','medium',1,2,'2026-02-26','2026-02-22'),
('t3','Inventory Stock Check','Count remaining stock for all items in the warehouse','completed','low',4,2,'2026-02-24','2026-02-18');

-- Insert Approvals
INSERT INTO approvals VALUES
('a1','Request for Annual Leave (3 days)','Vacation with family from March 5-7, 2026','leave','pending',1,NULL,NULL,NULL,'2026-02-23',NULL),
('a2','New Computer Purchase Request','Current machine has been in use for 5 years','purchase','approved',4,2,25000,'Approved as requested','2026-02-20','2026-02-22'),
('a3','Ad Budget Allocation','Requesting budget for online campaigns','budget','pending',1,NULL,50000,NULL,'2026-02-24',NULL),
('a4','Sick Leave Request','Fever and flu symptoms','leave','rejected',4,2,NULL,'No remaining leave days available','2026-02-15','2026-02-16');