# Aquaflow Backend API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### POST /auth/login
Login with email and password.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "consumer123",
  "role": "CONSUMER"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "CONSUMER",
    "avatar": "https://...",
    "consumerId": "8829-192-X",
    "zoneId": "uuid"
  }
}
```

### GET /auth/me
Get current authenticated user.

**Headers:** `Authorization: Bearer <token>`

---

## Consumer Endpoints
**Role Required:** CONSUMER

### GET /consumer/dashboard
Get dashboard data including current bill, supply schedule, complaints, and consumption history.

### GET /consumer/supply-schedule
Get water supply schedules for the user's zone.

### GET /consumer/bills
Get all bills for the authenticated consumer.

### POST /consumer/bills/:id/pay
Pay a specific bill.

**Request:**
```json
{
  "paymentMethod": "Online"
}
```

### GET /consumer/complaints
Get all complaints submitted by the consumer.

### POST /consumer/complaints
Submit a new complaint.

**Request:**
```json
{
  "category": "Low Pressure",
  "description": "Water pressure is very low in the mornings.",
  "imageUrl": "optional-url"
}
```

---

## Staff Endpoints
**Role Required:** STAFF or ADMIN

### GET /staff/dashboard
Get staff dashboard metrics (pending complaints, collection rate, etc.).

### GET /staff/schedules
Get all supply schedules.

### PUT /staff/schedules/:id
Update a supply schedule.

**Request:**
```json
{
  "morningSlot": "06:00 AM - 08:30 AM",
  "eveningSlot": "05:30 PM - 07:00 PM",
  "status": "On Time",
  "notes": "Optional notes"
}
```

### GET /staff/complaints
Get all complaints (with optional status filter).

**Query Params:** `?status=Open`

### PUT /staff/complaints/:id
Update complaint status.

**Request:**
```json
{
  "status": "Resolved",
  "resolution": "Issue fixed",
  "priority": "High"
}
```

### GET /staff/consumers
Get list of consumers (with optional search).

**Query Params:** `?search=john`

### POST /staff/meter-readings
Submit a meter reading and auto-generate bill.

**Request:**
```json
{
  "userId": "uuid",
  "meterId": "M-4921",
  "currentReading": 15000,
  "readingDate": "2025-01-16",
  "notes": "Optional notes"
}
```

---

## Admin Endpoints
**Role Required:** ADMIN

### GET /admin/dashboard
Get system-wide analytics (total consumers, revenue data, uptime, maintenance zones).

### GET /admin/users
Get all users (with optional filters).

**Query Params:** `?role=CONSUMER&search=john`

### POST /admin/users
Create a new user.

**Request:**
```json
{
  "name": "New User",
  "email": "user@example.com",
  "password": "password123",
  "role": "CONSUMER",
  "address": "123 Main St",
  "phone": "+1-555-0100",
  "zoneId": "uuid"
}
```

### PUT /admin/users/:id
Update user details.

### DELETE /admin/users/:id
Delete a user.

### GET /admin/zones
Get all zones.

### POST /admin/zones
Create a new zone.

**Request:**
```json
{
  "name": "Zone 7 - West District",
  "description": "New residential area",
  "capacity": 45.0,
  "subAreas": 3,
  "status": "Active"
}
```

### GET /admin/reports
Get system reports.

**Query Params:** `?type=consumption` (optional)

---

## Test Credentials

```
Admin:    admin@aquaflow.com / admin123
Staff:    staff@aquaflow.com / staff123
Consumer: john@example.com / consumer123
```

---

## Error Responses

**401 Unauthorized:**
```json
{
  "error": "No token provided"
}
```

**403 Forbidden:**
```json
{
  "error": "Insufficient permissions"
}
```

**404 Not Found:**
```json
{
  "error": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error"
}
```
