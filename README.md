# 🇪🇬 Exploregypt

> A full-stack tourism platform that helps tourists discover Egypt's most popular destinations, explore tourist attractions, save favorite places, and ask locals for help.

## 📌 Project Overview

**Exploregypt** is a Full-Stack web application designed to make exploring Egypt easier for tourists.

The platform focuses on a simple and practical experience:

- Discover major tourist cities in Egypt
- Explore attractions by city and category
- Search and filter tourist places
- View detailed information about each place
- Save places to favorites
- Ask questions about visiting Egypt
- Manage cities and places through an Admin Dashboard

## 🎯 MVP Scope

The first version focuses on six major tourist destinations:

- Cairo
- Luxor
- Aswan
- Hurghada
- Sharm El-Sheikh
- Dahab

### Core Features

- 🔐 **Authentication** — Register, Login, Logout
- 🏙️ **Cities** — Browse tourist cities
- 📍 **Places** — Discover attractions and view their details
- 🔎 **Search & Filter** — Find places by name, city, or category
- ❤️ **Favorites** — Save and manage favorite places
- 💬 **Ask an Egyptian** — Submit questions and receive answers
- 👨‍💼 **Admin Dashboard** — Manage cities, places, and questions

## 🛠️ Technologies

### Frontend
- React
- React Router
- Context API / React Hooks
- CSS / Responsive Design

### Backend
- Node.js
- Express.js
- RESTful API
- JWT Authentication
- Middleware
- Validation & Error Handling

### Database
- MongoDB

### Development Tools
- Git & GitHub
- Postman
- VS Code

## 🏗️ Project Structure

```text
Exploregypt/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
├── README.md
└── .gitignore
```

## 🗄️ Database Design

Main collections:

```text
Users
Cities
Places
Favorites
Questions
```

Basic relationships:

```text
User
 ├── Favorites ──── Place ──── City
 │
 └── Questions
```

## 🔌 Main API Routes

```text
/api/auth
/api/cities
/api/places
/api/favorites
/api/questions
```

### Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
```

### Cities

```text
GET    /api/cities
GET    /api/cities/:id
```

### Places

```text
GET    /api/places
GET    /api/places/:id
POST   /api/places
PUT    /api/places/:id
DELETE /api/places/:id
```

Search and filtering:

```text
GET /api/places?search=pyramid
GET /api/places?city=Cairo
GET /api/places?category=Museum
```

### Favorites

```text
GET    /api/favorites
POST   /api/favorites
DELETE /api/favorites/:placeId
```

### Questions

```text
GET    /api/questions
POST   /api/questions
PUT    /api/questions/:id
```

## 🔑 User Roles

### Tourist / User
- Browse cities and places
- Search and filter
- View place details
- Add/remove favorites
- Ask questions
- Manage profile

### Admin
- Manage cities
- Manage tourist places
- View and answer questions

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AK-Elshamy/Exploregypt.git
cd Exploregypt
```

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

### 3. Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

## 🔐 Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not commit `.env` or any secrets to GitHub.

## 📊 Architecture

```text
React Frontend
       │
       │ HTTP / REST API
       ▼
Node.js + Express
       │
       ├── Routes
       ├── Controllers
       ├── Middleware
       └── Models
       │
       ▼
    MongoDB
```

## 👥 Team

- Ahmed Khaled Elsayed
- Fatma Ahmed Mohamed
- Doha Mahmoud Ali
- Menna Abdallah Abdelaziz
- Abdelrahman Adel Hamdy
- Youssef Waleed Abdelkader
- Ahmed Samy Zaki
- AbdulRahman Ahmed Hamza

## 📚 Project Requirements

This project is developed as a Full-Stack project using **Node.js + Express for the Backend, React for the Frontend, and a Database**, with authentication, CRUD operations, search/filtering, responsive UI, and proper API integration.

## 🤖 AI Tools

AI tools may be used as development assistants for:

- Learning and explaining concepts
- Debugging
- Code suggestions
- Testing
- Documentation

All generated code should be reviewed, tested, understood, and modified by the team when necessary.

## 📄 License

This project is developed for educational purposes.
