# 🇪🇬 Exploregypt

> A full-stack tourism platform that helps tourists discover Egypt's most popular destinations, explore tourist attractions, save favorite places, and get useful travel information.

## 📌 Project Overview

**Exploregypt** is a Full-Stack web application designed to make exploring Egypt easier for tourists.

The platform provides a simple and practical experience for discovering destinations and tourist attractions across Egypt.

### Main Goals

- Discover major tourist cities in Egypt
- Explore tourist places by city and category
- Search, filter, sort, and paginate places
- View detailed information about tourist places
- Save and manage favorite places
- Provide useful travel information through a static ASK section
- Allow administrators to manage cities and places

---

## 🎯 MVP Scope

The first version focuses on six major tourist destinations:

- Cairo
- Luxor
- Aswan
- Hurghada
- Sharm El-Sheikh
- Dahab

### Core Features

- 🔐 **Authentication** — Register, Login, Logout, and Profile Management
- 🏙️ **Cities** — Browse tourist cities and view city details
- 📍 **Places** — Discover tourist attractions and view detailed information
- 🔎 **Search & Filter** — Search places and filter by city or category
- ↕️ **Sorting & Pagination** — Sort results and browse places across pages
- ❤️ **Favorites** — Add and remove places from personal favorites
- 💬 **ASK** — Static FAQ, warnings, alerts, and travel tips
- 👨‍💼 **Admin Dashboard** — Manage cities and tourist places
- 🌓 **Theme Mode** — Light and dim mode
- 📱 **Responsive UI** — Designed for desktop and mobile screens

---

## 💬 ASK Section

The **ASK** section is a static frontend feature.

It provides useful information for tourists, including:

- Frequently asked questions
- Common questions about visiting Egypt
- Travel warnings
- Important alerts
- Safety and travel tips
- Cultural and photography guidelines

ASK does **not** use a dynamic question-submission system.

There is no `/api/questions` endpoint in the current application.

---

## 🛠️ Technologies

### Frontend

- React
- React Router
- Context API
- React Hooks
- CSS
- Responsive Design

### Backend

- Node.js
- Express.js
- RESTful API
- JWT Authentication
- Middleware
- Validation
- Centralized Error Handling

### Database

- MongoDB
- Mongoose

### Development Tools

- Git
- GitHub
- Postman
- VS Code

---

## 🏗️ Project Structure

```text
Exploregypt/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── adminController.js
│   │   │   ├── authController.js
│   │   │   ├── cityController.js
│   │   │   ├── favoriteController.js
│   │   │   └── placeController.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── City.js
│   │   │   ├── Place.js
│   │   │   └── Favorite.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── cityRoutes.js
│   │   │   ├── placeRoutes.js
│   │   │   ├── favoriteRoutes.js
│   │   │   └── adminRoutes.js
│   │   ├── app.js
│   │   └── server.js
│   ├── postman/
│   │   └── Exploregypt-API.postman_collection.json
│   ├── .env.example
│   ├── .gitignore
│   ├── API.md
│   ├── package.json
│   └── seed.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Cities.jsx
│   │   │   ├── CityDetail.jsx
│   │   │   ├── Places.jsx
│   │   │   ├── PlaceDetail.jsx
│   │   │   ├── Favorites.jsx
│   │   │   ├── Ask.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
├── docs/
│   └── ERD.png
│
├── README.md
└── .gitignore
````

---

## 🗄️ Database Design

The application currently uses four main MongoDB collections:

```text
User
City
Place
Favorite
```

### Relationships

```text
City 1 ─────────── N Place

User 1 ─────────── N Favorite

Place 1 ────────── N Favorite
```

Therefore, users and places have a logical many-to-many relationship through `Favorite`:

```text
User N ─────────── M Place
          │
       Favorite
```

### User

Stores registered users and authentication information.

Main fields:

```text
_id
name
email
password
role
createdAt
updatedAt
```

Roles:

* `user`
* `admin`

Passwords are hashed before being stored.

### City

Stores tourist destinations.

Main fields:

```text
_id
name
description
image
region
createdAt
updatedAt
```

### Place

Stores tourist attractions and other tourism-related places.

Main fields:

```text
_id
name
description
city
category
image
location
rating
openingHours
ticketPrice
createdAt
updatedAt
```

Supported categories include:

```text
Historical
Museum
Beach
Nature
Religious
Entertainment
Shopping
Restaurant
Hotel
Other
```

### Favorite

Represents a user's saved place.

Main fields:

```text
_id
userId
placeId
createdAt
updatedAt
```

A unique compound index on `userId` and `placeId` prevents duplicate favorites for the same user and place.

### ERD

The database relationship diagram is available here:

```text
docs/ERD.png
```

---

## 🔌 Main API Routes

### Health

```text
GET /
```

### Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
PUT    /api/auth/me
```

### Cities

Public:

```text
GET    /api/cities
GET    /api/cities/:id
```

Admin:

```text
POST   /api/cities
PUT    /api/cities/:id
DELETE /api/cities/:id
```

### Places

Public:

```text
GET    /api/places
GET    /api/places/:id
```

Admin:

```text
POST   /api/places
PUT    /api/places/:id
DELETE /api/places/:id
```

### Places Search / Filtering

```text
GET /api/places?search=pyramid
GET /api/places?city=Cairo
GET /api/places?category=Museum
GET /api/places?sort=name
GET /api/places?page=1&limit=5
```

Parameters can also be combined.

### Favorites

Protected routes:

```text
GET    /api/favorites
POST   /api/favorites
DELETE /api/favorites/:placeId
```

### Admin Dashboard

Protected admin route:

```text
GET /api/admin/dashboard
```

Additional admin management routes are available under:

```text
/api/admin/cities
/api/admin/places
```

For complete request details, authentication requirements, request bodies, and response codes, see:

```text
backend/API.md
```

---

## 🔐 Authentication & Authorization

The application uses **JWT-based authentication**.

### Authentication Flow

```text
User
 │
 ├── Register
 │
 ├── Login
 │      │
 │      └── JWT Token
 │
 └── Authenticated Requests
        │
        ▼
   Auth Middleware
        │
        ├── Valid User
        │
        └── Admin Check
```

Protected endpoints require:

```text
Authorization: Bearer <token>
```

### User

Regular users can:

* Browse cities
* Browse places
* Search and filter places
* View place details
* Add/remove favorites
* Manage their profile
* Access the static ASK section

### Admin

Administrators can:

* Manage cities
* Manage tourist places
* Access dashboard statistics
* Perform protected CRUD operations

---

## ⚠️ Error Handling

The backend uses structured HTTP status codes including:

```text
200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
500 Internal Server Error
```

The application also uses centralized error handling for unexpected backend errors.

---

## 🔒 Environment Variables

Create a `.env` file inside the `backend` directory.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not commit `.env` or any secrets to GitHub.

The repository contains:

```text
backend/.env.example
```

as a safe configuration template.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AK-Elshamy/Exploregypt.git
cd Exploregypt
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create:

```text
backend/.env
```

and configure the required environment variables.

Start the backend:

```bash
npm start
```

The API runs on:

```text
http://localhost:5000
```

### 3. Seed Database

From the backend directory:

```bash
node seed.js
```

The seed provides sample cities and tourist places for the application.

### 4. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Testing

Backend tests can be executed with:

```bash
cd backend
npm test
```

The project includes automated smoke tests for:

* API health check
* Unknown route handling

Additional API testing can be performed using the provided Postman collection.

---

## 📮 Postman

The Postman collection is available at:

```text
backend/postman/Exploregypt-API.postman_collection.json
```

It includes requests for:

* Health check
* Authentication
* Cities
* Places
* Search and filtering
* Pagination
* Favorites
* Admin dashboard
* Admin CRUD operations

The collection uses variables such as:

```text
baseUrl
token
cityId
placeId
```

---

## 📊 Architecture

```text
┌─────────────────────┐
│   React Frontend    │
│                     │
│ Pages / Components  │
│ Context / Hooks     │
└──────────┬──────────┘
           │
           │ HTTP / REST API
           ▼
┌─────────────────────┐
│  Node.js + Express  │
│                     │
│ Routes              │
│ Controllers         │
│ Middleware          │
│ Models              │
└──────────┬──────────┘
           │
           │ Mongoose
           ▼
┌─────────────────────┐
│       MongoDB       │
│                     │
│ User                │
│ City                │
│ Place               │
│ Favorite             │
└─────────────────────┘
```

---

## 👥 Team Members

| Member                        | Main Contribution               |
| ----------------------------- | ------------------------------- |
| **Ahmed Khaled Elsayed**      | Authentication & Users          |
| **Fatma Ahmed Mohamed**       | Cities Management               |
| **Doha Mahmoud Ali**          | Places Management               |
| **Menna Abdallah Abdelaziz**  | Search & Filter                 |
| **Abdelrahman Adel Hamdy**    | Favorites                       |
| **Youssef Waleed Abdelkader** | ASK / Travel Information        |
| **Ahmed Samy Zaki**           | Admin Dashboard & Authorization |

> Each team member is responsible for understanding, implementing, testing, and contributing to their assigned part of the project. Contributions are tracked through Git and GitHub.

---

## 📚 Project Requirements

Exploregypt is developed as a Full-Stack project using:

* **React** for the frontend
* **Node.js + Express** for the backend
* **MongoDB + Mongoose** for the database

The project includes:

* RESTful APIs
* Authentication and authorization
* Protected routes
* CRUD operations
* Validation
* Error handling
* Search
* Filtering
* Sorting
* Pagination
* Favorites
* Responsive UI
* Database relationships
* Environment variables
* Git/GitHub workflow
* API documentation
* Postman collection
* ERD/database documentation

---

## 🤖 AI Tools

AI tools were used as development assistants during the project for:

* Learning and explaining concepts
* Debugging
* Code suggestions
* Testing
* Documentation
* Reviewing project structure

All generated code and suggestions were reviewed, tested, understood, and adapted by the team when necessary.

---

## 📄 License

This project was developed for educational purposes.
EOF

---