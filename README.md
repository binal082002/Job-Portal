# 🧑‍💼 Job Portal (MERN Stack)

A full-stack Job Portal built using the MERN stack (MongoDB, Express.js, React.js, Node.js).  
It allows users to register, log in, browse and apply for jobs, and upload resumes. Admins can post jobs and view applications.

---

## 🛠️ Tech Stack

- **Frontend**: React.js  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Authentication**: JWT (JSON Web Token)  
- **Resume Upload**: Multer (for file uploads)

---

## ✨ Features

### 👤 User
- Register & log in
- View job listings
- Apply to jobs
- Upload resume

### 🛠️ Admin
- Add job postings
- View all applications

---

## 📁 Project Structure

- **server** – Node.js + Express + MongoDB  
- **client** – React.js  

---

## 🔗 API Endpoints

### Auth
- `POST /register` – Register user  
- `POST /login` – Login user  
- `GET /user` – Get current user *(auth required)*

### Jobs
- `POST /add-job` – Add job *(admin only)*  
- `GET /jobs` – List all jobs  
- `POST /apply-job/:id` – Apply to a job *(auth required)*

### Applications
- `GET /applications` – View job applications *(admin only)*

### Resume Upload
- `POST /upload` – Upload resume *(auth required)*

---

## 🚀 Getting Started

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/job-portal.git
cd job-portal
```

### Step 2: Set up backend

```bash
cd server
npm install
npm start
```

### Step 3: Set Up Frontend

```bash
cd client
npm install
npm run dev
```
