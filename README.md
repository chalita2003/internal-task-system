# Internal Task & Approval System

A full-stack Internal Task & Approval System designed for organizations to manage task creation, approval workflows, and role-based access control.

Built with modern web technologies and fully containerized using Docker for consistent development and deployment environments.

---

## 🚀 Features

- 🔐 Authentication & Role-based Authorization (User / Approver / Admin)
- 📝 Task Creation & Management
- ✅ Multi-level Approval Workflow
- 📊 Task Status Tracking (Pending / Approved / Rejected)
- 🗄 MySQL Database Integration
- 🐳 Dockerized Full-stack Architecture

---

## 🏗 Architecture Overview

This system follows a 3-tier architecture:

Frontend (Client)
- Built with modern React-based framework
- Handles UI rendering and API communication

Backend (Server)
- RESTful API service
- Business logic & approval workflow handling
- Connects to MySQL database

Database
- MySQL 8
- Stores users, tasks, approvals, and system data

All services are containerized and orchestrated using Docker Compose.

---

## 🛠 Tech Stack

### Frontend
- React / Next.js
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- JWT Authentication

### Database
- MySQL 8

### DevOps
- Docker
- Docker Compose

---

## 🐳 Running with Docker

### 1️⃣ Clone Repository

```bash
git clone https://github.com/chalita2003/internal-task-system.git
cd internal-task-system
