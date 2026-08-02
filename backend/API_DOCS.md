# Evora API Reference

This document provides a comprehensive list of all backend API endpoints for the Evora application. It includes the HTTP method, endpoint path, expected request format (JSON body, query parameters, or form-data), and the source routing file for each endpoint.

---

## Authentication (`/api/v1/auth`)

| Method | Endpoint | Format (JSON Body / Params) | Source File |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | **Body (JSON):**<br>`{ name: string, email: string, password: string }` | [auth.routes.js](./src/modules/auth/routes/auth.routes.js#L9) |
| `POST` | `/api/v1/auth/login` | **Body (JSON):**<br>`{ email: string, password: string }` | [auth.routes.js](./src/modules/auth/routes/auth.routes.js#L10) |
| `POST` | `/api/v1/auth/change-password-first-login` | **Body (JSON):**<br>`{ newPassword: string }` | [auth.routes.js](./src/modules/auth/routes/auth.routes.js#L11-L16) |

---

## Users (`/api/v1/users`)

| Method | Endpoint | Format (JSON Body / Params) | Source File |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/users/me` | *None* | [users.routes.js](./src/modules/users/routes/users.routes.js#L10) |
| `PATCH` | `/api/v1/users/me` | **Body (JSON):**<br>`{ name?: string }` | [users.routes.js](./src/modules/users/routes/users.routes.js#L11) |
| `PATCH` | `/api/v1/users/me/avatar` | **Form-Data:**<br>`avatar: File (image)` | [users.routes.js](./src/modules/users/routes/users.routes.js#L12-L18) |
| `GET` | `/api/v1/users/me/saved-events` | *None* | [users.routes.js](./src/modules/users/routes/users.routes.js#L20) |
| `POST` | `/api/v1/users/me/saved-events/:eventId` | **URL Params:**<br>`eventId: string (ObjectId)` | [users.routes.js](./src/modules/users/routes/users.routes.js#L21) |
| `DELETE` | `/api/v1/users/me/saved-events/:eventId` | **URL Params:**<br>`eventId: string (ObjectId)` | [users.routes.js](./src/modules/users/routes/users.routes.js#L22) |

---

## Events (`/api/v1/events`)

| Method | Endpoint | Format (JSON Body / Params) | Source File |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/events/` | **Query Params:**<br>`page?, limit?, search?, category?, status?, sortBy?, sortOrder?` | [events.routes.js](./src/modules/events/routes/events.routes.js#L26) |
| `GET` | `/api/v1/events/admin/all` | **Query Params:**<br>`page?, limit?, search?, category?, status?, sortBy?, sortOrder?` | [events.routes.js](./src/modules/events/routes/events.routes.js#L27-L34) |
| `GET` | `/api/v1/events/:eventId` | **URL Params:**<br>`eventId: string (ObjectId)` | [events.routes.js](./src/modules/events/routes/events.routes.js#L35) |
| `POST` | `/api/v1/events/` | **Body (JSON):**<br>`{ title: string, description: string, category: string, venue?: string, location?: string, startDate: Date, endDate: Date, maxSeats: number, banner?: string, status?: string }` | [events.routes.js](./src/modules/events/routes/events.routes.js#L37-L44) |
| `PATCH` | `/api/v1/events/:eventId` | **URL Params:** `eventId: string (ObjectId)`<br>**Body (JSON):**<br>`{ title?, description?, category?, venue?, location?, startDate?, endDate?, maxSeats?, banner?, status? }` | [events.routes.js](./src/modules/events/routes/events.routes.js#L46-L53) |
| `DELETE` | `/api/v1/events/:eventId` | **URL Params:**<br>`eventId: string (ObjectId)` | [events.routes.js](./src/modules/events/routes/events.routes.js#L55-L62) |
| `PATCH` | `/api/v1/events/:eventId/status` | **URL Params:** `eventId: string (ObjectId)`<br>**Body (JSON):**<br>`{ status: string }` | [events.routes.js](./src/modules/events/routes/events.routes.js#L64-L71) |
| `POST` | `/api/v1/events/:eventId/banner` | **URL Params:** `eventId: string (ObjectId)`<br>**Form-Data:**<br>`banner: File (image)` | [events.routes.js](./src/modules/events/routes/events.routes.js#L73-L81) |

---

## Bookings (`/api/v1/bookings`)

| Method | Endpoint | Format (JSON Body / Params) | Source File |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/bookings/` | **Body (JSON):**<br>`{ eventId: string (ObjectId) }` | [bookings.routes.js](./src/modules/bookings/routes/bookings.routes.js#L21-L28) |
| `GET` | `/api/v1/bookings/me` | *None* | [bookings.routes.js](./src/modules/bookings/routes/bookings.routes.js#L30-L36) |
| `PATCH` | `/api/v1/bookings/:bookingId/check-in` | **URL Params:**<br>`bookingId: string (ObjectId)` | [bookings.routes.js](./src/modules/bookings/routes/bookings.routes.js#L38-L45) |
| `GET` | `/api/v1/bookings/event/:eventId` | **URL Params:**<br>`eventId: string (ObjectId)` | [bookings.routes.js](./src/modules/bookings/routes/bookings.routes.js#L47-L54) |
| `GET` | `/api/v1/bookings/all` | *None* | [bookings.routes.js](./src/modules/bookings/routes/bookings.routes.js#L56-L63) |

---

## Media (`/api/v1/media`)

| Method | Endpoint | Format (JSON Body / Params) | Source File |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/media/upload` | **Query Params:**<br>`module?: "avatar" \| "event-banner" \| "generic"`<br>**Form-Data:**<br>`image: File (image)` | [media.routes.js](./src/modules/media/routes/media.routes.js#L10-L16) |

---

## Admin (`/api/v1/admin`)

| Method | Endpoint | Format (JSON Body / Params) | Source File |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/admin/users/admins` | **Body (JSON):**<br>`{ name: string, email: string, password: string }` | [admin.routes.js](./src/modules/admin/routes/admin.routes.js#L12) |
| `PATCH` | `/api/v1/admin/users/admins/:adminId/disable` | **URL Params:**<br>`adminId: string (ObjectId)` | [admin.routes.js](./src/modules/admin/routes/admin.routes.js#L13) |
| `GET` | `/api/v1/admin/users/admins` | *None* | [admin.routes.js](./src/modules/admin/routes/admin.routes.js#L14) |
| `GET` | `/api/v1/admin/analytics` | *None* | [admin.routes.js](./src/modules/admin/routes/admin.routes.js#L15) |
