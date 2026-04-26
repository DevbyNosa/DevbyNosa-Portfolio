devbynosa - Personal Portfolio Website
A full-stack, responsive personal portfolio website designed to showcase projects, skills, and professional experience. Built with a robust backend, a custom CMS for content management, and integrated messaging capabilities. 
🚀 Features
Modern Portfolio Frontend: Clean design using plain CSS for fast loading.
Dynamic Content: Server-side rendered pages using EJS.
Custom Admin CMS: Secure admin panel to manage portfolio content (projects, skills, experience).
Total Viewers Analytics: Dashboard chart for tracking visitor statistics.
Messaging System: Integrated contact form using Nodemailer for direct communication. 
🛠️ Tech Stack
Backend: Node.js, Express.js
Frontend: EJS (Embedded JavaScript Templating), Plain CSS
Database: PostgreSQL
Email Service: Nodemailer 
📦 Prerequisites
Node.js (v14 or higher)
PostgreSQL
An email account (for Nodemailer) 
⚙️ Installation & Setup
Clone the repository:
bash
git clone https://github.com/yourusername/devbynosa.git
cd devbynosa
Install dependencies:
bash
npm install
Setup Database:
Create a PostgreSQL database and run the SQL scripts located in the /database folder.
Configure Environment Variables:
Create a .env file in the root directory and add the following:
env

# Database Config
PORT=3000
DB_HOST=localhost
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_NAME=devbynosa

ADMIN_PREFIX=admin

# Cloudinary

CLOUDINARY_NAME=your-cloud-name
CLOUDINARY_KEY=your-cloud-key
CLOUDINARY_SECRET=your-cloud-secret

# Nodemailer config
EMAIL_ADDRESS=your_email@gmail.com
EMAIL_PASSWORD=your_app_password


Run the application:
bash
npm start


 
🖥️ CMS Access
Access the admin panel by creating your ADMIN_PREFIX in .env file to update your portfolio content and view visitor analytics.
📩 Contact
Created by devbynosa - feel free to contact me!
Tiktok - https://tiktok.com/@devbynosa_
portfolio - https://devbybnosa.onrender.com