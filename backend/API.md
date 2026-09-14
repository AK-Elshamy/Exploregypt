# 🇪🇬 Exploregypt API Documentation

## Base URL

During local development:

```text
http://localhost:5000
````

---

## Health Check

### Check API Status

```http
GET /
```

### Response

```json
{
  "message": "Exploregypt API is running",
  "status": "ok"
}
```

---

# 🔐 Authentication

Authentication uses JWT (JSON Web Tokens).

Protected endpoints require:

```http
Authorization: Bearer <JWT>
```

---

## Register

Create a new tourist/user account.

```http
POST /api/auth/register
Content-Type: application/json
```

### Request Body

```json
{
  "name": "Ahmed",
  "email": "ahmed@example.com",
  "password": "secret123"
}
```

### Success Response

```http
201 Created
```

```json
{
  "message": "User registered successfully",
  "token": "<JWT>",
  "user": {
    "id": "...",
    "name": "Ahmed",
    "email": "ahmed@example.com",
    "role": "user"
  }
}
```

### Possible Errors

```http
400 Bad Request
```

For missing or invalid data.

```http
409 Conflict
```

If the email is already registered.

---

## Login

Authenticate an existing user.

```http
POST /api/auth/login
Content-Type: application/json
```

### Request Body

```json
{
  "email": "ahmed@example.com",
  "password": "secret123"
}
```

### Success Response

```http
200 OK
```

```json
{
  "message": "Login successful",
  "token": "<JWT>",
  "user": {
    "id": "...",
    "name": "Ahmed",
    "email": "ahmed@example.com",
    "role": "user"
  }
}
```

### Possible Errors

```http
400 Bad Request
```

Missing email or password.

```http
401 Unauthorized
```

Invalid email or password.

---

## Logout

Logout endpoint for the current stateless JWT authentication flow.

```http
POST /api/auth/logout
```

### Success Response

```http
200 OK
```

```json
{
  "message": "Logout successful"
}
```

> The frontend removes the stored JWT after logout.

---

## Get Current User

Returns the authenticated user's profile.

```http
GET /api/auth/me
Authorization: Bearer <JWT>
```

### Success Response

```http
200 OK
```

```json
{
  "id": "...",
  "name": "Ahmed",
  "email": "ahmed@example.com",
  "role": "user"
}
```

### Possible Errors

```http
401 Unauthorized
```

Missing, invalid, or expired JWT.

---

## Update Current User

Update the authenticated user's profile.

```http
PUT /api/auth/me
Authorization: Bearer <JWT>
Content-Type: application/json
```

### Example Request

```json
{
  "name": "Ahmed Khaled",
  "email": "ahmed@example.com",
  "password": "newpassword123"
}
```

### Success Response

```http
200 OK
```

Returns the updated user data.

### Possible Errors

```http
400 Bad Request
```

Invalid data.

```http
401 Unauthorized
```

Missing or invalid JWT.

```http
409 Conflict
```

Email already belongs to another user.

---

# 🏙️ Cities

Cities represent the main tourist destinations available on Exploregypt.

---

## Get All Cities

```http
GET /api/cities
```

### Success

```http
200 OK
```

Returns a list of cities.

---

## Get City by ID

```http
GET /api/cities/:id
```

### Success

```http
200 OK
```

### Possible Errors

```http
404 Not Found
```

City does not exist.

---

## Create City

Admin only.

```http
POST /api/cities
Authorization: Bearer <ADMIN_JWT>
Content-Type: application/json
```

### Example Request

```json
{
  "name": "Cairo",
  "description": "The capital of Egypt and home to many historical attractions.",
  "image": "https://example.com/cairo.jpg",
  "region": "Egypt"
}
```

### Success

```http
201 Created
```

### Possible Errors

```http
400 Bad Request
```

Invalid or missing data.

```http
401 Unauthorized
```

Missing or invalid JWT.

```http
403 Forbidden
```

Authenticated user is not an admin.

---

## Update City

Admin only.

```http
PUT /api/cities/:id
Authorization: Bearer <ADMIN_JWT>
Content-Type: application/json
```

### Success

```http
200 OK
```

### Possible Errors

```http
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
```

---

## Delete City

Admin only.

```http
DELETE /api/cities/:id
Authorization: Bearer <ADMIN_JWT>
```

### Success

```http
200 OK
```

### Possible Errors

```http
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error
```

---

# 📍 Places

Places represent tourist attractions and other useful locations in Egypt.

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

---

## Get Places

Public endpoint.

```http
GET /api/places
```

Supports searching, filtering, sorting, and pagination.

### Search

```http
GET /api/places?search=pyramid
```

### Filter by City

```http
GET /api/places?city=Cairo
```

### Filter by Category

```http
GET /api/places?category=Museum
```

### Sorting

Ascending by name:

```http
GET /api/places?sort=name_asc
```

Descending by name:

```http
GET /api/places?sort=name_desc
```

Default sorting uses rating and name.

### Pagination

```http
GET /api/places?page=1&limit=10
```

### Combine Filters

Example:

```http
GET /api/places?city=Cairo&category=Historical&search=pyramid&page=1&limit=10
```

### Success Response

```http
200 OK
```

Example structure:

```json
{
  "count": 10,
  "total": 17,
  "page": 1,
  "pages": 2,
  "data": [
    {
      "_id": "...",
      "name": "Giza Pyramids",
      "description": "One of Egypt's most famous historical landmarks.",
      "city": "...",
      "category": "Historical",
      "image": "https://example.com/pyramids.jpg",
      "location": "Giza, Egypt",
      "rating": 5,
      "openingHours": "8:00 AM - 5:00 PM",
      "ticketPrice": "..."
    }
  ]
}
```

---

## Get Place by ID

```http
GET /api/places/:id
```

### Success

```http
200 OK
```

### Possible Errors

```http
404 Not Found
```

Place does not exist.

---

## Create Place

Admin only.

```http
POST /api/places
Authorization: Bearer <ADMIN_JWT>
Content-Type: application/json
```

### Example Request

```json
{
  "name": "Giza Pyramids",
  "description": "One of the most famous archaeological sites in Egypt.",
  "city": "<CITY_ID>",
  "category": "Historical",
  "image": "https://example.com/pyramids.jpg",
  "location": "Giza, Egypt",
  "rating": 5,
  "openingHours": "8:00 AM - 5:00 PM",
  "ticketPrice": "Varies"
}
```

### Success

```http
201 Created
```

### Possible Errors

```http
400 Bad Request
401 Unauthorized
403 Forbidden
```

---

## Update Place

Admin only.

```http
PUT /api/places/:id
Authorization: Bearer <ADMIN_JWT>
Content-Type: application/json
```

### Success

```http
200 OK
```

### Possible Errors

```http
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
```

---

## Delete Place

Admin only.

```http
DELETE /api/places/:id
Authorization: Bearer <ADMIN_JWT>
```

### Success

```http
200 OK
```

### Possible Errors

```http
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error
```

---

# ❤️ Favorites

Favorites are private to authenticated users.

---

## Get My Favorites

```http
GET /api/favorites
Authorization: Bearer <JWT>
```

### Success

```http
200 OK
```

Returns the authenticated user's favorite places.

---

## Add Favorite

```http
POST /api/favorites
Authorization: Bearer <JWT>
Content-Type: application/json
```

### Request Body

```json
{
  "placeId": "<PLACE_ID>"
}
```

### Success

```http
201 Created
```

### Possible Errors

```http
400 Bad Request
```

Invalid or missing place ID.

```http
401 Unauthorized
```

Missing or invalid JWT.

```http
404 Not Found
```

Place does not exist.

```http
409 Conflict
```

Place is already in the user's favorites.

---

## Remove Favorite

```http
DELETE /api/favorites/:placeId
Authorization: Bearer <JWT>
```

### Success

```http
200 OK
```

### Possible Errors

```http
401 Unauthorized
```

Missing or invalid JWT.

```http
404 Not Found
```

Favorite does not exist.

---

# 👨‍💼 Admin API

Admin endpoints require:

1. A valid JWT.
2. The authenticated user's role must be `admin`.

Requests without the required permissions return:

```http
401 Unauthorized
```

or:

```http
403 Forbidden
```

---

## Dashboard

```http
GET /api/admin/dashboard
Authorization: Bearer <ADMIN_JWT>
```

Returns administrative statistics.

### Success

```http
200 OK
```

---

## Admin Cities

### Create City

```http
POST /api/admin/cities
Authorization: Bearer <ADMIN_JWT>
```

### Update City

```http
PUT /api/admin/cities/:id
Authorization: Bearer <ADMIN_JWT>
```

### Delete City

```http
DELETE /api/admin/cities/:id
Authorization: Bearer <ADMIN_JWT>
```

---

## Admin Places

### Create Place

```http
POST /api/admin/places
Authorization: Bearer <ADMIN_JWT>
```

### Update Place

```http
PUT /api/admin/places/:id
Authorization: Bearer <ADMIN_JWT>
```

### Delete Place

```http
DELETE /api/admin/places/:id
Authorization: Bearer <ADMIN_JWT>
```

---

# 💬 ASK / Q&A

The ASK section is a **static frontend feature**.

It provides tourists with:

* Frequently asked questions.
* Common questions about visiting Egypt.
* Travel tips.
* Important warnings.
* Safety information.
* Useful recommendations.

ASK does **not** use a dynamic question-submission API.

There is no `/api/questions` endpoint in the current application.

The content is managed as static frontend data and does not require authentication or database storage.

---

# 🔑 Authorization

## Public Endpoints

The following endpoints are publicly accessible:

```text
GET  /
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout

GET /api/cities
GET /api/cities/:id

GET /api/places
GET /api/places/:id
```

---

## Authenticated User Endpoints

Require:

```http
Authorization: Bearer <JWT>
```

Examples:

```text
GET    /api/auth/me
PUT    /api/auth/me

GET    /api/favorites
POST   /api/favorites
DELETE /api/favorites/:placeId
```

---

## Admin Endpoints

Require a valid JWT and:

```text
role = admin
```

Examples:

```text
POST   /api/cities
PUT    /api/cities/:id
DELETE /api/cities/:id

POST   /api/places
PUT    /api/places/:id
DELETE /api/places/:id

GET    /api/admin/dashboard
POST   /api/admin/cities
PUT    /api/admin/cities/:id
DELETE /api/admin/cities/:id
POST   /api/admin/places
PUT    /api/admin/places/:id
DELETE /api/admin/places/:id
```

---

# 📊 HTTP Status Codes

The API uses standard HTTP status codes.

| Status | Meaning                            |
| ------ | ---------------------------------- |
| `200`  | Request successful                 |
| `201`  | Resource successfully created      |
| `400`  | Bad request / validation error     |
| `401`  | Authentication required or invalid |
| `403`  | Insufficient permissions           |
| `404`  | Resource not found                 |
| `409`  | Conflict                           |
| `500`  | Internal server error              |

---

# 🔐 Environment Variables

Create:

```text
backend/.env
```

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Important

Do not commit `.env` or any secret values to GitHub.

The repository should contain an example file:

```text
backend/.env.example
```

with placeholder values only.

---

# 🧪 Testing

Run the backend tests from:

```text
backend/
```

Command:

```bash
npm test
```

The integration tests verify the API health endpoint and JSON 404 handling without requiring a MongoDB connection.

---

# 🏗️ API Architecture

```text
React Frontend
       │
       │ HTTP / REST API
       ▼
Node.js + Express
       │
       ├── Routes
       │
       ├── Controllers
       │
       ├── Middleware
       │
       └── Models
       │
       ▼
    MongoDB
```

---

# 📌 Main API Routes

```text
/api/auth
/api/cities
/api/places
/api/favorites
/api/admin
```

ASK / Q&A is static and therefore does not have a backend API route.

---
