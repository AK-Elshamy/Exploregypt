# 🇪🇬 Exploregypt

> A full-stack tourism platform that helps tourists discover Egypt's most popular destinations, explore tourist attractions, save favorite places, and interact with the platform through a simple and responsive user experience.

## 📌 Project Overview

**Exploregypt** is a Full-Stack web application designed to make exploring Egypt easier for tourists.

The platform provides a practical tourism experience where users can:

- Discover major tourist cities in Egypt
- Explore tourist places and attractions
- Search and filter places
- View detailed information about places
- Save places to favorites
- Register and log in securely
- Interact with tourism-related questions
- Use the application in Light Mode or Dark Mode
- Browse Egypt through a dedicated landing page and tourism-focused UI

The project combines a **React frontend**, **Node.js + Express backend**, and **MongoDB database**.

---

## 🎯 MVP Scope

The first version focuses on six major tourist destinations in Egypt:

- Cairo
- Luxor
- Aswan
- Hurghada
- Sharm El-Sheikh
- Dahab

### Core Features

- 🔐 **Authentication** — Register, Login, Logout
- 🏙️ **Cities** — Browse tourist cities
- 📍 **Places** — Discover tourist attractions and view their details
- 🔎 **Search & Filter** — Find places by name, city, or category
- ❤️ **Favorites** — Save and manage favorite places
- 💬 **Questions** — Tourism-related questions through the platform
- 👨‍💼 **Admin Dashboard** — Manage cities, places, and administrative operations
- 🌓 **Dark Mode** — Switch between Light Mode and Dark Mode
- 📱 **Responsive UI** — Designed for a clean experience across different screen sizes
- 🏠 **Tourism Landing Page** — A dedicated Home page focused on introducing Egypt rather than duplicating the Places page

---

## 🏠 Home Page

The Home page was designed as a tourism-focused landing page rather than another search and filtering page.

It includes sections highlighting:

- 🇪🇬 Welcome to Egypt
- 🌊 The Nile
- 🏺 Ancient Egyptian history
- 🏙️ The New Administrative Capital
- 🌊 Red Sea destinations
- 🏙️ Tourist cities
- 📍 Featured tourist places
- ✨ Tourism-focused visual sections

The goal is to give visitors an introduction to Egypt before they start exploring cities and places.

---

## 🛠️ Technologies

### Frontend

- React
- React Router
- Context API
- React Hooks
- CSS
- Responsive Design
- Vite

### Backend

- Node.js
- Express.js
- RESTful API
- JWT Authentication
- Middleware
- Validation
- Error Handling
- bcrypt

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
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   ├── seed.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── Navbar.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── README.md
└── .gitignore
````

> The exact project structure may evolve as the project continues to be developed.

---

## 🗄️ Database Design

Main MongoDB collections:

```text
Users
Cities
Places
Favorites
Questions
```

### Basic Relationships

```text
User
 ├── Favorites ──── Place ──── City
 │
 └── Questions
```

Places are associated with cities, while authenticated users can manage their favorite places.

---

## 🌍 Tourist Places

The project currently includes tourist attractions covering the main MVP destinations.

Examples include:

### Cairo

* Giza Pyramids
* Egyptian Museum
* Historical attractions

### Luxor

* Karnak Temple
* Valley of the Kings

### Aswan

* Philae Temple
* Nubian Village

### Hurghada

* Hurghada Marina
* Giftun Island

### Sharm El-Sheikh

* Ras Mohammed National Park

### Dahab

* Dahab Lagoon

The database can be extended with additional attractions as the project grows.

---

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
POST   /api/cities
PUT    /api/cities/:id
DELETE /api/cities/:id
```

### Places

```text
GET    /api/places
GET    /api/places/:id
POST   /api/places
PUT    /api/places/:id
DELETE /api/places/:id
```

### Search and Filtering

Places can be searched and filtered through query parameters.

Examples:

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

---

## 🔑 User Roles

### Tourist / User

Authenticated users can:

* Browse cities and places
* Search and filter places
* View place details
* Add places to favorites
* Remove places from favorites
* Use authentication features
* Interact with tourism-related questions

### Admin

Administrators can:

* Manage cities
* Manage tourist places
* Perform administrative operations
* Manage questions where supported by the application

---

## 🔐 Authentication & Security

The application uses JWT-based authentication.

Passwords are securely hashed using **bcrypt** before being stored in the database.

Protected operations use authentication middleware to verify the user's identity and permissions.

Sensitive environment variables such as database credentials and JWT secrets are stored in `.env` and should never be committed to GitHub.

---

## 🌓 Dark Mode

Exploregypt includes a Dark Mode that can be toggled from the navigation bar.

The selected theme is stored locally so the user's preference can remain active between sessions.

The Dark Mode changes the application's interface to a black-based theme while keeping tourism images in their original appearance.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AK-Elshamy/Exploregypt.git
cd Exploregypt
```

### 2. Backend

Open a terminal:

```bash
cd backend
npm install
npm start
```

The backend runs on:

```text
http://localhost:5000
```

You can verify that the API is running by opening:

```text
http://localhost:5000/
```

Expected response:

```json
{
  "message": "Exploregypt API is running",
  "status": "ok"
}
```

### 3. Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite will provide the local frontend URL in the terminal.

---

## 🌱 Database Seeding

The project includes a seed file for inserting the initial cities and tourist places into MongoDB.

From the backend directory:

```bash
node seed.js
```

Make sure MongoDB is running before executing the seed script.

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` directory.

Example:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/exploregypt
JWT_SECRET=your_jwt_secret
```

### Important

Do not commit `.env` or any secrets to GitHub.

The `.env` file should remain local.

---

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

The frontend communicates with the backend through REST APIs.

The backend handles authentication, business logic, validation, authorization, and database operations.

MongoDB stores users, cities, places, favorites, and questions.

---

## 🧪 API Integration & Testing

The project includes API integration between the React frontend and the Express backend.

The API can be tested using tools such as **Postman** and through frontend requests.

Testing focuses on important application flows including:

* User registration
* User login
* Authentication
* Cities retrieval
* Places retrieval
* Search and filtering
* Favorites
* Protected API operations
* Error handling
* API responses

The backend was also tested locally with MongoDB to verify that the server can connect successfully and respond to API requests.

---

## 👥 Team Members & Contributions

| Member                        | Main Contribution                                                |
| ----------------------------- | ---------------------------------------------------------------- |
| **Ahmed Khaled Elsayed**      | Authentication & Users, API Integration, Testing & Documentation |
| **Fatma Ahmed Mohamed**       | Cities Management                                                |
| **Doha Mahmoud Ali**          | Places Management                                                |
| **Menna Abdallah Abdelaziz**  | Search & Filter                                                  |
| **Abdelrahman Adel Hamdy**    | Favorites                                                        |
| **Youssef Waleed Abdelkader** | Ask an Egyptian                                                  |
| **Ahmed Samy Zaki**           | Admin Dashboard & Authorization                                  |
| **Abdul Rahman Ahmed Hamza**  | Frontend Components & UI/UX                                      |

> Each team member is responsible for understanding, implementing, testing, and contributing to their assigned part of the project. Contributions are tracked through Git and GitHub.

---

## 📚 Project Requirements

This project is developed as a Full-Stack project using:

* **Node.js + Express** for the Backend
* **React** for the Frontend
* **MongoDB** as the Database

The project includes:

* Authentication
* Authorization
* CRUD operations
* Search and filtering
* Responsive UI
* RESTful APIs
* API integration
* Database relationships
* Environment variables
* Error handling
* Git/GitHub workflow
* API testing
* Documentation

---

## 🤖 AI Tools

AI tools may be used as development assistants for:

* Learning and explaining concepts
* Debugging
* Code suggestions
* Testing
* Documentation
* Improving UI/UX ideas

All generated code should be reviewed, tested, understood, and modified by the team when necessary.

---

## 🔗 Repository

GitHub Repository:

```text
https://github.com/AK-Elshamy/Exploregypt
```

---

## 📄 License

This project is developed for educational purposes.

---