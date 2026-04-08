นี่คือร่างไฟล์ README.md สำหรับโปรเจกต์ Internal Task System ของคุณครับ ผมเขียนให้ออกมาดูเป็นมืออาชีพ เข้าใจง่าย และครอบคลุมทั้งขั้นตอนการติดตั้งและการแก้ปัญหาที่เพื่อนๆ มักจะเจอ (เช่นเรื่อง MySQL 8)

📝 Internal Task System
โปรเจกต์ระบบจัดการงานภายในองค์กร พัฒนาด้วยเทคโนโลยี Modern Full-stack และจัดการระบบด้วย Docker เพื่อให้ง่ายต่อการติดตั้งและรันโปรเจกต์ในทุกสภาพแวดล้อม

🚀 เทคโนโลยีที่ใช้
Frontend: Vue.js (Vuetify)

Backend: Node.js (Express/Router)

Database: MySQL 8.0

Orchestration: Docker & Docker Compose

🛠 ขั้นตอนการเริ่มใช้งาน (Getting Started)
สำหรับใครที่ Clone โปรเจกต์นี้ไป สามารถเริ่มรันระบบได้ง่ายๆ ตามขั้นตอนดังนี้:

1. เตรียมความพร้อม
ตรวจสอบว่าเครื่องของคุณติดตั้งซอฟต์แวร์เหล่านี้แล้ว:

Docker Desktop

Git

2. Clone โปรเจกต์
เปิด Terminal หรือ Command Prompt แล้วใช้คำสั่ง:

Bash
git clone https://github.com/your-username/internal-task-system.git
cd internal-task-system
3. รันระบบด้วย Docker Compose
โปรเจกต์นี้ถูกตั้งค่าให้เชื่อมต่อกันโดยอัตโนมัติ คุณเพียงแค่ใช้คำสั่งเดียว:

Bash
docker compose up -d --build
ระบบจะทำการ Build Image สำหรับ Frontend, Backend และตั้งค่า MySQL ให้พร้อมใช้งาน

4. การเข้าใช้งาน
เมื่อรันสำเร็จ คุณสามารถเข้าใช้งานผ่าน Browser ได้ดังนี้:

Frontend: http://localhost:8080

Backend API: http://localhost:3000

Database Port: 3306

⚙️ การตั้งค่า Environment Variables
ค่าเริ่มต้นถูกตั้งไว้ใน docker-compose.yml ดังนี้:

DB_HOST: mysql (เชื่อมต่อภายใน Docker Network)

DB_USER: root

DB_PASSWORD: root1234

DB_NAME: internal_task_system

🆘 การแก้ไขปัญหาที่พบบ่อย (Troubleshooting)
1. เข้าสู่ระบบไม่ได้ / Access Denied (MySQL 8)
หากเจอ Error ER_ACCESS_DENIED_ERROR ให้ทำการล้างข้อมูลเก่าใน Volume และรันใหม่ด้วยคำสั่ง:

Bash
docker compose down -v
docker compose up -d --build
หมายเหตุ: การใช้ -v จะเป็นการล้างฐานข้อมูลเก่าเพื่อให้รหัสผ่านใหม่ที่ตั้งใน docker-compose ทำงานได้

2. ตรวจสอบสถานะ Container
หากต้องการดูว่าแต่ละส่วนทำงานปกติหรือไม่:

Bash
docker compose ps
3. ดู Log ของ Backend
หากต้องการดู Error ฝั่ง Server:

Bash
docker compose logs -f backend
👥 ผู้พัฒนา
ชลิตา คืบกระโทก (แบม) - Digital Technology Student @SUT
