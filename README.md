# Agent Management App

This project is a MERN (MongoDB, Express.js, React.js, Node.js) application built to fulfill a machine test assignment with the following core features:

-  Admin Login and Authentication (using JWT)
-  Agent Creation and Management (CRUD)
-  Upload and Distribution of Tasks via CSV
-  Display of tasks assigned to agents

---

##  Features

###  User Authentication
- Admin can register and log in
- Passwords are hashed using `bcrypt`
- JWT-based token authentication
- Protected routes (e.g., profile)

###  Agent Management
- Create, read, update, and delete agents
- Agents have name, email, mobile, and password

###  CSV Upload & Task Distribution
- Accepts `.csv`, `.xlsx`, or `.xls` files
- Validates format (FirstName, Phone, Notes)
- Distributes tasks evenly across 5 agents
- Stores tasks in MongoDB

###  Dashboard
- Displays task distribution grouped by agent
- Navigation links to other pages (add agent, upload CSV, logout)

---

##  Tech Stack

| Layer         | Technology         |
|---------------|--------------------|
| Frontend      | React.js, Vite, Bootstrap |
| Backend       | Express.js, Node.js |
| Database      | MongoDB (Mongoose) |
| Authentication| JWT (jsonwebtoken) |
| Password Hash | Bcrypt.js |
| File Upload   | Multer |
| CSV Parsing   | `csv-parser`, `xlsx` |

---

##  Folder Structure

project/
├── client/ (React frontend)
│ ├── src/
│ │ ├── components/
│ │ │ ├── Login.jsx
│ │ │ ├── Signup.jsx
│ │ │ ├── AddAgent.jsx
│ │ │ ├── AgentList.jsx
│ │ │ ├── UploadCSV.jsx
│ │ │ ├── AgentDashboard.jsx
│ │ │ └── ...
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── App.css
│ └── ...
├── server/
│ ├── models/
│ ├── routes/
│ ├── index.js
│ └── .env

---

##  How to Run the Project

### 1 Backend (Node + Express + MongoDB)

cd server
npm install
node index.js
npm start

### 2️ Frontend (React + Vite)

cd client
npm install
npm run dev

## Environment Variables (.env)
Path agent-creation-app\server\.env


PORT=3001
MONGO_URI=mongodb://localhost:27017/player
JWT_SECRET=your_super_secret_jwt_key

## Demo Video
[https://drive.google.com/file/d/17PCAS0Ubj5pkvvjP4Z4DfQwBnC_UyLth/view?usp=drive_link]

## Developed By
Your Name: Aditi Kumari 
MERN Stack Developer Candidate


