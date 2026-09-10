# Exploregypt API Documentation

Base URL during local development:

```text
http://localhost:5000
```

## Health Check

```http
GET /
```

Response:

```json
{
  "message": "Exploregypt API is running",
  "status": "ok"
}
```

## Authentication

### Register

```http
POST /api/auth/register
Content-Type: application/json
```

Body:

```json
{
  "name": "Ahmed",
  "email": "ahmed@example.com",
  "password": "secret123"
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json
```

Body:

```json
{
  "email": "ahmed@example.com",
  "password": "secret123"
}
```

### Logout

```http
POST /api/auth/logout
```

### Current User

```http
GET /api/auth/me
Authorization: Bearer <JWT>
```

### Update Current User

```http
PUT /api/auth/me
Authorization: Bearer <JWT>
Content-Type: application/json
```

## Cities

```http
GET    /api/cities
GET    /api/cities/:id
POST   /api/cities
PUT    /api/cities/:id
DELETE /api/cities/:id
```

## Places

```http
GET    /api/places
GET    /api/places/:id
POST   /api/places
PUT    /api/places/:id
DELETE /api/places/:id
```

> The exact POST/PUT/DELETE authorization rules are enforced by the route middleware.

## Admin

All admin endpoints require a valid JWT for a user with the `admin` role.

```http
GET    /api/admin/dashboard
POST   /api/admin/cities
PUT    /api/admin/cities/:id
DELETE /api/admin/cities/:id
POST   /api/admin/places
PUT    /api/admin/places/:id
DELETE /api/admin/places/:id
GET    /api/admin/questions
PUT    /api/admin/questions/:id/answer
DELETE /api/admin/questions/:id
```

## Authentication Header

For protected endpoints send:

```text
Authorization: Bearer <JWT>
```

## Environment Variables

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

`MONGODB_URI` is also accepted for compatibility with the project README.

## Testing

Run from the `backend` directory:

```bash
npm test
```

The current integration smoke tests verify the API health endpoint and JSON 404 handling without requiring a MongoDB connection.

## Team Integration Note

Favorites and Questions routes should be mounted in `src/app.js` when those team implementations are merged. They are intentionally not required until their route files exist, so the current backend does not crash on startup because of missing modules.
